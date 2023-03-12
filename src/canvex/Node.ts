import { Stage } from "./Stage";
import { Vec2D } from "./Vec2D";

export interface INode {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  visible?: boolean;
  opacity?: number;
  scale?: Vec2D;
  scaleX?: number;
  scaleY?: number;
  rotate?: number;
  draggable?: boolean;
  stage?: Stage;
  [key: string]: any;
}

export abstract class Node implements INode{
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  visible = true;
  opacity = 1;
  scale = {x: 1, y: 1};
  scaleX = 1;
  scaleY = 1;
  rotate = 0;
  draggable = false;
  [key: string]: any;
  ctx: CanvasRenderingContext2D | null = null;
  parent?: Node | null = null;
  children?: Node[] = [];
  // attrs: Options = {} as Options;
  constructor(options: INode) {
    this.setAttrs(options);
  }

  setAttrs(attrs: INode) {
    for (const key in attrs) {
      this[key] = attrs[key];
    }
    if (this.stage) {
      requestAnimationFrame(() => this.stage.render());
    }
  }

  bindCtx(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  _cacheStage(stage: Stage) {
    this.stage = stage;
  }

  appendChild<T extends Node>(child: T) {
    if (child.parent) {
      child.parent.removeChild(child);
      child.parent = this;
    }
    if (!this.children) {
      this.children = [child];
    } else {
      this.children.push(child);
    }
  }

  hasChildren() {
    return this.children && this.children.length > 0;
  }

  removeChild<T extends Node>(child: T) {
    if (this.children) {
      this.children.splice(this.children.indexOf(child), 1);
    }
    child.parent = null;
  }

  removeAllChild() {
    if (this.children) {
      this.children.forEach(child => {
        child.parent = null;
      });
    }
    this.children = [];
  }

  getChild(index: number) {
    if (this.children) {
      return this.children[index];
    }
    return null;
  }

  onClick() {}

  onHover() {}

  onHoverOut() {}

  onWheel() {}

  onDrag(x: number, y: number) {
    this.setAttrs({x, y});
  }

  onDragEnd() {}

  onDragStart() {}

}