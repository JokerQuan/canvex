import { Shape, IShape } from "../Shape";
import { rotatePoint } from "../Utils";
import { Vec2D } from "../Vec2D";

export interface IPolygon extends IShape {
  points?: Vec2D[];
}

export class Polygon extends Shape implements IPolygon {

  type = 'polygon';
  points: Vec2D[];
  pathPoints: Vec2D[] = [];

  constructor(options: IPolygon) {
    super(options);
    this.points = options.points!;
    this._init();
  }

  _init() {
    // 计算图形所占矩形区域的宽高、中点，用于后续缩放、旋转操作
    let maxX = -Infinity, 
        maxY = -Infinity,
        minX = Infinity,
        minY = Infinity;

    this.points.forEach(p => {
      if (p.x < minX) {
        minX = p.x;
      } else if (p.x > maxX) {
        maxX = p.x;
      }

      if (p.y < minY) {
        minY = p.y;
      } else if (p.y > maxY) {
        maxY = p.y;
      }
    });

    this.x = maxX - (maxX - minX) / 2;
    this.y = maxY - (maxY - minY) / 2;
    this.width = maxX - minX;
    this.height = maxY - minY;

    this.scaleX = this.scaleX || 1;
    this.scaleY = this.scaleY || 1;
  }

  /**
   * 设置基于canvas原点旋转后的绘图路径
   */
  _setRenderPath() {
    const { points, scaleX, scaleY, x, y } = this;
    const ctx = this.ctx!;
    ctx.beginPath();
    points.forEach((p, index) => {
      const tx = (p.x - x) * scaleX;
      const ty = (p.y - y) * scaleY;
      if (index === 0) {
        ctx.moveTo(tx, ty);
      } else {
        ctx.lineTo(tx, ty);
      }
    });
    ctx.closePath(); 
  }

  /**
     * pathPoints： canvas 旋转后，多边形顶点也需要旋转，用于点击、拖拽的命中判断
     */
  _setPathPoints() {
    const { points, rotate, x, y, scaleX, scaleY } = this;
    const ctx = this.ctx!;
    this.pathPoints = points!.map(p => {
      const tx = (p.x - x) * scaleX + x;
      const ty = (p.y - y) * scaleY + y;
      return rotatePoint(tx, ty, x, y, rotate);
    });

    ctx.beginPath();
    this.pathPoints.forEach((p, index) => {
      if (index === 0) {
        ctx.moveTo(p.x, p.y);
      } else {
        ctx.lineTo(p.x, p.y);
      }
    });
    ctx.closePath(); 
  }

  onDrag(x: number, y: number) {
    const offsetX = x - this.x;
    const offsetY = y - this.y;
    this.x = x;
    this.y = y;
    this.points.forEach(p => {
      p.x += offsetX;
      p.y += offsetY;
    });
    this.pathPoints.forEach(p => {
      p.x += offsetX;
      p.y += offsetY;
    });
  }

  containPoint(px: number, py: number): boolean {
    const ctx = this.ctx!;
    this._setPathPoints();
    // debug 
    // ctx.lineWidth = 1;
    // ctx.strokeStyle = 'black';
    // ctx.stroke();
    return ctx.isPointInPath(px, py);
  }

  render(): void {
    let { x, y, width, height, background = 'white', opacity, rotate, style, lineWidth, backgroundImage } = this;
    const ctx = this.ctx!;
    ctx.globalAlpha = opacity;

    this._rotate(ctx, rotate, x, y);
    this._setRenderPath();

    // 设置渐变
    if (typeof background !== 'string') {
      const colors = background.direction === 'left' ? background.colors.toReversed() : background.colors;
      background = ctx.createLinearGradient( - width / 2, y,  + width / 2, y);
      const step = 1 / (colors.length - 1);
      for(let i = 0; i < colors.length; i++) {
        background.addColorStop(step * i, colors[i]);
      }
    }


    if (style === 'stroke') {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = background
      ctx.stroke();
    } else {
      ctx.fillStyle = background;
      ctx.fill();
    }
    if (backgroundImage) {
      ctx.save();
      ctx.clip();
      ctx.drawImage(backgroundImage,  - width / 2,  - height / 2, width, height);
      ctx.restore();
    }
    
    ctx.restore();
    
    ctx.globalAlpha = 1;
  }
}