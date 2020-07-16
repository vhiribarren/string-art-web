import {Vec2} from "./math"

export {Frame, CircleFrame, Pin, Point, Direction}


class Point extends Vec2 {};
class Direction extends Vec2 {};
class Pin extends Point {}

interface Frame {
    readonly pins: Pin[];
    nearestPins(point: Point, direction: Direction): [Pin, Pin] | undefined;
}


class CircleFrame implements Frame {

    #origin: Point;
    #radius: number;

    readonly pins: Pin[];

    constructor(origin: Point=new Point(0, 0), radius: number=1, pinCount: number=10) {
        this.#origin = origin;
        this.#radius = radius;
        this.pins = [];
        for(let i=0; i<pinCount; i++) {
            let angle = (2*Math.PI) * i / pinCount ;
            let x = origin.x + radius * Math.cos(angle);
            let y = origin.y + radius * Math.sin(angle);
            this.pins.push(new Pin(x, y));
        }
    }

    nearestPins(point: Point, direction: Point): [Pin, Pin] | undefined {
        const collisionPoints = this.circleLineCollision(point, direction);
        if (! collisionPoints) {
            return undefined;
        }
        const results: Pin[] = [];
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
        return results as [Pin, Pin];
    }

    circleLineCollision(point: Point, direction: Point): [Point, Point] | undefined {
        const r_square = Math.pow(this.#radius, 2);
        const u = direction.normalize();
        const C = this.#origin;
        const A = point;
        const L = C.sub(A);
        const d = L.dot(u);
        const l_square = L.dot(L);
        if (d < 0.0 && l_square > r_square) {
            return undefined;
        }
        const m_square = l_square - Math.pow(d, 2);
        if (m_square > r_square) {
            return undefined;
        }
        const q = Math.sqrt(r_square - m_square);
        return [A.add(u.mulScalar(d - q)), A.add(u.mulScalar(d + q))];
    }

}


class RectangularFrame implements Frame {

    pins: Pin[] = [];

    constructor(origin: Point, width: number, height: number, widthPinCount: number=10, heightPinCount: number=10) {
    }

    nearestPins(point: Point, direction: Point): [Point, Point] {
        throw new Error("Method not implemented.");
    }

}



