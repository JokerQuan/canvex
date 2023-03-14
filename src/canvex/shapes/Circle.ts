import { Shape, IShape } from "../Shape";

export interface ICircle extends IShape {
  radius?: number;
}

export class Circle extends Shape implements ICircle {
  type = 'circle';
  constructor(options: ICircle) {
    super(options);
  }

  containPoint(px: number, py: number) {
    const { x, y, radius } = this;
    return Math.sqrt((px - x) * (px - x) + (py - y) * (py - y)) <= radius;
  }

  render(): void {
    let { x, y, radius, background = 'white', borderColor = 'black', opacity, backgroundImage,  shadowColor = '#000', shadowBlur = 0, shadowOffsetX = 0, shadowOffsetY = 0 } = this;
    const ctx = this.ctx!;
    ctx.globalAlpha = opacity;
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    if (background && typeof background !== 'string') {
      const colors = background.colors;
      background = ctx.createRadialGradient(x, y, 0, x, y, radius);
      const step = 1 / (colors.length - 1);
      for(let i = 0; i < colors.length; i++) {
        background.addColorStop(step * i, colors[i]);
      }
    }
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.fillStyle = background;
    ctx.fill()
    if (backgroundImage) {
      ctx.save();
      ctx.clip();
      ctx.drawImage(backgroundImage, x - radius, y - radius, radius * 2, radius * 2);
      ctx.restore();
    }
    if (borderColor) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = borderColor;
      ctx.stroke();
      ctx.closePath();
    }

    ctx.globalAlpha = 1;
  }
}