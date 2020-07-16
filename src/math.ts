export {
    Vec2
}


class Vec2 {

    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    dot(vec: Vec2): number {
        return this.x*vec.x + this.y*vec.y;
    }

    norm(): number {
        return Math.sqrt(this.x*this.x + this.y*this.y)
    }

    normSquare(): number {
        return this.x*this.x + this.y*this.y;
    }

    normalize(): Vec2 {
        const norm = this.norm();
        return new Vec2(this.x / norm, this.y / norm);
    }

    distanceTo(point: Vec2): number {
        const xDistance = point.x - this.x;
        const yDistance = point.y - this.y;
        return new Vec2(xDistance, yDistance).norm();
    }

    distanceSquareTo(point: Vec2): number {
        const xDistance = point.x - this.x;
        const yDistance = point.y - this.y;
        return new Vec2(xDistance, yDistance).normSquare();
    }

    add(point: Vec2): Vec2 {
        return new Vec2(this.x + point.x, this.y + point.y);
    }

    addScalar(scalar: number): Vec2 {
        return new Vec2(this.x + scalar, this.y + scalar);
    }

    mulScalar(scalar: number): Vec2 {
        return new Vec2(this.x * scalar, this.y * scalar);
    }
 
    sub(point: Vec2): Vec2 {
        return new Vec2(this.x - point.x, this.y - point.y);
    }

}
