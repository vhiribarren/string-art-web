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

import {CircleFrame, RectangleFrame, Frame, Point, Direction, Ray} from "./frame";
import {drawCircle, drawLine} from "./drawing";
import {generateCircleShape, generateBezierCurve} from "./shape";

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const FRAME_PIN_NB = 2*36;
const FRAME_STRING_NB = 4*36;


function drawPins(ctx: CanvasRenderingContext2D, points: Point[]) {
    points.forEach((pin, _) => {
        drawCircle(ctx, pin.x, pin.y, 2, "blue");
    })
}


const canvas = document.createElement('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
ctx.fillStyle = "#5F9EA0";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//const frame = new CircleFrame(new Point(250, 250), 240, FRAME_PIN_NB);
const frame = new RectangleFrame(new Point(10, 10), CANVAS_WIDTH - 20, CANVAS_HEIGHT - 20, FRAME_PIN_NB/4, FRAME_PIN_NB/4);
const testPoint = new Point(100, 380);
const testDirection = new Direction(1, 1);
const testRay = new Ray(testPoint, testDirection);

drawPins(ctx, frame.pins);


//const shapeGenerator = generateCircleShape(new Point(CANVAS_WIDTH/4, CANVAS_HEIGHT/2),  CANVAS_HEIGHT/4, FRAME_STRING_NB);
const shapeGenerator = generateCircleShape(new Point(CANVAS_WIDTH/2, CANVAS_HEIGHT/2),  CANVAS_HEIGHT/2-10, FRAME_STRING_NB);
/*
const shapeGenerator = generateBezierCurve(
    new Point(0, CANVAS_HEIGHT),
    new Point(0, -CANVAS_HEIGHT),
    new Point(CANVAS_WIDTH, 2*CANVAS_HEIGHT),
    new Point(CANVAS_WIDTH, 0),
    FRAME_STRING_NB);
*/
/*
const shapeGenerator = generateBezierCurve(
    new Point(0, 0),
    new Point(CANVAS_WIDTH*0.66, 0),
    new Point(CANVAS_WIDTH, 0.34*CANVAS_HEIGHT),
    new Point(CANVAS_WIDTH, CANVAS_HEIGHT),
    FRAME_STRING_NB);
*/
for (let ray of shapeGenerator) {
    const pins = frame.nearestPins(ray);
    if (pins) {
        drawLine(ctx, pins[0].x, pins[0].y, pins[1].x, pins[1].y)
        //drawPins(ctx, [ray.origin]);
    }
}
