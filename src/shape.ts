import { Point, Direction, Ray } from "./frame";

export {generateCircleShape, generateBezierCurve}

function* generateCircleShape(center: Point, radius: number, pointCount: number): IterableIterator<Ray> {
    for (let i=0; i<pointCount; i++) {
        const angle = 2*Math.PI * i / pointCount;
        const angleOrth = Math.PI/2 + angle;
        const xc = center.x + radius * Math.cos(angle);
        const yc = center.y + radius * Math.sin(angle);
        const point = new Point(xc, yc);
        const direction = new Direction(Math.cos(angleOrth), Math.sin(angleOrth));
        yield new Ray(point, direction);
    }
}

/*
function* generateHalfCircleShape(center: Point, radius: number, pointCount: number): IterableIterator<Ray> {
}
*/

function* generateBezierCurve(p0: Point, p1: Point, p2: Point, p3: Point, pointCount: number): IterableIterator<Ray> {
    for (let i=0; i<pointCount; i++) {
        const t = i / pointCount;
        const origin = bezierCurveCoordinates(p0, p1, p2, p3, t);
        const derivative = bezierCurveDerivative(p0, p1, p2, p3, t);
        const direction = isFinite(derivative) ? new Direction(1, derivative) : new Direction(0, 1);
        yield new Ray(origin, direction);
    }
}


function bezierCurveCoordinates(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
    const c0 = p0.mulScalar(Math.pow(1 - t, 3));
    const c1 = p1.mulScalar(3 * Math.pow(1 - t, 2) * t);
    const c2 = p2.mulScalar(3 * (1-t) * Math.pow(t, 2));
    const c3 = p3.mulScalar(Math.pow(t, 3));
    return c0.add(c1.add(c2.add(c3)));
}


function bezierCurveDerivative(p0: Point, p1: Point, p2: Point, p3: Point, t: number): number {
    const c0 = p1.sub(p0).mulScalar(3 * Math.pow(1 - t, 2));
    const c1 = p2.sub(p1).mulScalar(6 * (1 - t) * t);
    const c2 = p3.sub(p2).mulScalar(3 * Math.pow(t, 2));
    const d = c0.add(c1.add(c2));
    return d.y / d.x;
}