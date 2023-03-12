import { Polygon, IPolygon } from "./Polygon";

export interface IRect extends IPolygon {
  
}

export class Rect extends Polygon implements IRect {
  type = 'rect';
  constructor(options: IRect) {
    super(options);
  }

  _getPoints(x: number, y: number, width: number, height: number) {
    const points = [{
      x: x - width / 2,
      y: y - height / 2
    }, {
      x: x + width / 2,
      y: y - height / 2
    }, {
      x: x + width / 2,
      y: y + height / 2
    }, {
      x: x - width / 2,
      y: y + height / 2
    }];
    return points;
  }

  setAttrs(attrs: IRect) {
    let { x, y, width, height } = attrs;
    // 如果改变矩形位置、大小，需要根据已有数据重新计算顶点坐标
    if (x !== undefined || y !== undefined || width !== undefined || height !== undefined) {
      if (x === undefined) x = this.x;
      if (y === undefined) y = this.y;
      if (width === undefined) width = this.width;
      if (height === undefined) height = this.height;
      attrs.points = this._getPoints(x!, y!, width!, height!);
    }
    super.setAttrs.call(this, attrs);
  }
}