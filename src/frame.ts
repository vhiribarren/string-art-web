/*
MIT License
Copyright (c) 2020 Vincent Hiribarren
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import {Vec2} from "./math"

export {Frame, CircleFrame, RectangleFrame, Ray, Point, Direction}


class Point extends Vec2 {};
class Direction extends Vec2 {};
class Ray {
    constructor(readonly origin: Point, readonly direction: Direction) {}
}

interface Frame {
    readonly pins: Point[];
    nearestPins(ray: Ray): [Point, Point] | undefined;
}


class CircleFrame implements Frame {

    #origin: Point;
    #radius: number;

    readonly pins: Point[];

    constructor(origin: Point=new Point(0, 0), radius: number=1, pinCount: number=10) {
        this.#origin = origin;
        this.#radius = radius;
        this.pins = [];
        for(let i=0; i<pinCount; i++) {
            let angle = (2*Math.PI) * i / pinCount ;
            let x = origin.x + radius * Math.cos(angle);
            let y = origin.y + radius * Math.sin(angle);
            this.pins.push(new Point(x, y));
        }
    }

    nearestPins(ray: Ray): [Point, Point] | undefined {
        const collisionPoints = this.circleLineCollision(ray);
        if (! collisionPoints) {
            return undefined;
        }
        const results: Point[] = [];
        // TODO Not needed to browse the array, we can directly access in the pins array
        collisionPoints.forEach( (collisionPoint, _) => {
            let minDistance = Number.MAX_VALUE;
            let minPin = undefined;
            this.pins.forEach( (pinCandidate, _) => {
                let distance = collisionPoint.distanceSquareTo(pinCandidate);
                if (distance < minDistance) {
                    minDistance = distance;
                    minPin = pinCandidate;
                }
            });
            results.push(minPin);
        });
        return results as [Point, Point];
    }

    circleLineCollision(ray: Ray): [Point, Point] | undefined {
        const r_square = Math.pow(this.#radius, 2);
        const u = ray.direction.normalize();
        const C = this.#origin;
        const A = ray.origin;
        const L = C.sub(A);
        const d = L.dot(u);
        const l_square = L.dot(L);
        // If enabled, only consider points inside the circle
        // TODO Add a parameter to accept or refuse external points
        //if (l_square > r_square) {
        //    return undefined;
        //}
        const m_square = l_square - Math.pow(d, 2);
        if (m_square > r_square) {
            return undefined;
        }
        const q = Math.sqrt(r_square - m_square);
        return [A.add(u.mulScalar(d - q)), A.add(u.mulScalar(d + q))];
    }

}


class RectangleFrame implements Frame {

    pins: Point[] = [];
    private pointTopLeft: Point;
    private pointBottomLeft: Point;
    private pointTopRight: Point;
    private pointBottomRight: Point;

    constructor(origin: Point, width: number, height: number, widthPinCount: number=10, heightPinCount: number=10) {
        this.pointTopLeft = origin;
        this.pointBottomLeft = new Point(origin.x, origin.y + height);
        this.pointTopRight = new Point(origin.x + width, origin.y);
        this.pointBottomRight = new Point(origin.x + width, origin.y + height);
        const widthStep = width / widthPinCount;
        for (let i=0; i <widthPinCount; i++) {
            this.pins.push(new Point(origin.x + i*widthStep, origin.y));
            this.pins.push(new Point(origin.x + width - i*widthStep, origin.y + height));
        }
        const heightStep = height / heightPinCount;
        for (let i=0; i <heightPinCount; i++) {
            this.pins.push(new Point(origin.x + width, origin.y + i*heightStep));
            this.pins.push(new Point(origin.x, origin.y + height - i*heightStep));
        }
    }

    nearestPins(ray: Ray): [Point, Point] {
        const collisionPoints = this.lineRectangleCollision(ray);
        if (! collisionPoints) {
            return undefined;
        }
        const results: Point[] = [];
        collisionPoints.forEach( (collisionPoint, _) => {
            let minDistance = Number.MAX_VALUE;
            let minPin = undefined;
            this.pins.forEach( (pinCandidate, _) => {
                let distance = collisionPoint.distanceSquareTo(pinCandidate);
                if (distance < minDistance) {
                    minDistance = distance;
                    minPin = pinCandidate;
                }
            });
            results.push(minPin);
        });
        return results as [Point, Point];
    }

    private lineRectangleCollision(ray: Ray): [Point, Point] | undefined {
        const result: Point[] = [];
        const widthCandidates = [
            this.lineIntersection(ray, new Ray(this.pointTopLeft, new Direction(1, 0))),
            this.lineIntersection(ray, new Ray(this.pointBottomRight, new Direction(-1, 0))),
        ]
        widthCandidates.forEach((point) => {
            if (point == null) {
                return;
            }
            if (point.x > this.pointBottomLeft.x && point.x < this.pointBottomRight.x) {
                result.push(point);
            }
        })
        const heightCandidates = [
            this.lineIntersection(ray, new Ray(this.pointTopRight, new Direction(0, 1))),
            this.lineIntersection(ray, new Ray(this.pointBottomLeft, new Direction(0, -1))),
        ]
        heightCandidates.forEach((point) => {
            if (point == null) {
                return;
            }
            if ( point.y < this.pointBottomLeft.y && point.y > this.pointTopLeft.y ) {
                result.push(point);
            }
        })
        return result.length == 2 ? result as [Point, Point] : undefined;
    }

    private lineIntersection(rayLeft: Ray, rayRight: Ray): Point | undefined {
        // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
        const l1p1 = rayLeft.origin;
        const l1p2 = rayLeft.origin.add(rayLeft.direction);
        const l2p1 = rayRight.origin;
        const l2p2 = rayRight.origin.add(rayRight.direction);
        const n = (l1p1.y - l2p1.y) * (l2p2.x - l2p1.x) - (l1p1.x - l2p1.x) * (l2p2.y - l2p1.y);
        const d = (l1p2.x - l1p1.x) * (l2p2.y - l2p1.y) - (l1p2.y - l1p1.y) * (l2p2.x - l2p1.x);
        if( d === 0 ) {
            return undefined;
        }
        const t = n / d;
        const px = l1p1.x + t * (l1p2.x - l1p1.x);
        const py = l1p1.y + t * (l1p2.y - l1p1.y);
        return new Point(px, py);
    }

}



