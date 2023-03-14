import { Node, INode } from "./Node";

export interface IShape extends INode {
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowOpacity?: number;
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