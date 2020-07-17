import { Point, Direction, Ray } from "./frame";

export {generateCircleShape}

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
    return;
}