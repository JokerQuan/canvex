import { Shape, IShape } from "../Shape";
import { Vec2D } from "../Vec2D";

export interface ILine extends IShape {
  lineWidth?: number;
  points?: Vec2D[];
}

export class Line extends Shape implements ILine {
  type = 'line';
  constructor(options: ILine) {
    super(options);
  }

  containPoint() {
    return false;
  }

  render(): void {
    const { points, lineWidth, opacity, color = 'black' } = this;
    const ctx = this.ctx!;
    ctx.globalAlpha = opacity!;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.stroke();
    ctx.closePath();
    ctx.globalAlpha = 1;
  }
}