import {CircleFrame, Frame, Point, Pin, Direction} from "./frame";
import {drawCircle} from "./drawing";

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

function drawPins(ctx: CanvasRenderingContext2D, pins: Pin[]) {
    frame.pins.forEach((pin, _) => {
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

const frame = new CircleFrame(new Point(250, 250), 240, 120);
const testPoint = new Point(100, 380);
const testDirection = new Direction(1, 1);
const pins = frame.nearestPins(testPoint, testDirection);

drawPins(ctx, frame.pins);
drawCircle(ctx, testPoint.x, testPoint.y, 3, "red");
pins.forEach((pin, _) => {
    drawCircle(ctx, pin.x, pin.y, 3, "orange");
});