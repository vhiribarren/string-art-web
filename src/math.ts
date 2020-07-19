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
