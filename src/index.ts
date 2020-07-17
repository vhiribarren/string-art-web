import {CircleFrame, Frame, Point, Direction, Ray} from "./frame";
import {drawCircle, drawLine} from "./drawing";
import {generateCircleShape} from "./shape";

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

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

const frame = new CircleFrame(new Point(250, 250), 240, 50);
const testPoint = new Point(100, 380);
const testDirection = new Direction(1, 1);
const testRay = new Ray(testPoint, testDirection);
const pins = frame.nearestPins(testRay);

drawPins(ctx, frame.pins);


const circleGenerator = generateCircleShape(new Point(CANVAS_WIDTH/2, CANVAS_HEIGHT/2),  CANVAS_HEIGHT/4, 100);

for (let ray of circleGenerator) {
    const pins = frame.nearestPins(ray);
    drawLine(ctx, pins[0].x, pins[0].y, pins[1].x, pins[1].y)
    drawPins(ctx, [ray.origin]);

}
