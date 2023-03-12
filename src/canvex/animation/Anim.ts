import { Node, INode } from "../Node";

export class Anim {
  ele: Node;
  targets: INode;
  duration: number;
  tween: Function;
  constructor(ele: Node, targets: INode, duration: number, tween: Function) {
    this.ele = ele;
    this.targets = targets;
    this.duration = duration;
    this.tween = tween;
  }

  start() {
    const { ele, targets, duration, tween } = this;
    const begin:{[key:string]:any} = {};
    const change:{[key:string]:any} = {};
    const current:{[key:string]:any} = {};
    for (const attr in targets) {
      begin[attr] = ele[attr];
      change[attr] = targets[attr] - begin[attr];
    }
    const startTime = Date.now();
    const anim = () => {
      const currTime = Math.min(duration, Date.now() - startTime);
      for (const attr in targets) {
        current[attr] = tween(currTime, begin[attr], change[attr], duration);
      }
      
      this.onAnim(current);

      let isFinish = true;
      for (const attr in targets) {
        if (current[attr] !== targets[attr]) {
          isFinish = false;
          break;
        }
      }
      if (isFinish) {
        this.onFinish();
      } else {
        requestAnimationFrame(anim);
      }
    }
    anim();
  }

  onAnim(values:{[key:string]:any}) {}

  onFinish() {}
}