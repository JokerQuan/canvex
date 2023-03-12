import { Node, INode } from "./Node";
import { Vec2D } from "./Vec2D";

export interface IShape extends INode {
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffset?: Vec2D;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowOpacity?: number;
  shadowEnabled?: boolean;
}

export abstract class Shape extends Node implements IShape {
  constructor(options: IShape) {
    super(options);
  }

  _rotate(ctx: CanvasRenderingContext2D, angle: number, x: number, y: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);
  }

  abstract containPoint(px: number, py: number): boolean;

  abstract render(): void;
}