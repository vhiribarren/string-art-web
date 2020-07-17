
export type FillStyle = string | CanvasGradient | CanvasPattern;

export function drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, style: FillStyle) {
    ctx.fillStyle = style;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
}


export function drawLine(ctx: CanvasRenderingContext2D, xs: number, ys: number, xe: number, ye: number) {
    //ctx.fillStyle = style;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(xs, ys);
    ctx.lineTo(xe, ye);
    ctx.stroke();
}