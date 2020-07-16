
export type FillStyle = string | CanvasGradient | CanvasPattern;

export function drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, style: FillStyle) {
    ctx.fillStyle = style;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
}