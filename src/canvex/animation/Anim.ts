import { Tween } from "./Tween";

type AnyNumberProps = {
  [key: string]: number;
}
export interface AnimOptions {
  from: AnyNumberProps;
  to: AnyNumberProps;
  duration: number;
  tween?: (t: number, b: number, c: number, d: number) => number;
  delay?: number;
  count?: number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
}
export class Anim {
  from: AnyNumberProps = {};
  to: AnyNumberProps = {};
  duration: number = 1000;
  tween = Tween.ease;
  delay = 0;
  count = 1;
  direction = 'normal';

  isStarted = false;
  isPaused = false;
  isFinished = false;

  beginState: AnyNumberProps = {};
  endState: AnyNumberProps = {};
  currentState: AnyNumberProps = {};
  currentCount = 0;
  currentTime = 0;
  startTime = 0;

  constructor(options: AnimOptions) {
    this.from = options.from;
    this.to = options.to;
    this.duration = options.duration;
    this.tween = options.tween || Tween.ease;
    this.delay = options.delay || 0;
    this.count = options.count || 1;
    this.direction = options.direction || 'normal';

    for (const attr in this.to) {
      this.beginState[attr] = this.from[attr];
      this.endState[attr] = this.to[attr];
    }
  }

  /**
   * 根据direction交换开始、结束状态
   *    normal: 都是从 begin 到 end，不用特殊处理
   *    reverse: 都是从 end 到 begin
   *    alternate: 当前为第 0、2、4、6 次时，是从 begin 到 end
   *    alternate-reverse: 当前为第 0、2、4、6 次时，是从 end 到 begin
   */
  private _setStatesByDirection() {
    const { direction, currentCount } = this;
    // reverse 只交换一次
    if (direction === 'reverse' && currentCount < 1) {
      [this.beginState, this.endState] = [this.endState, this.beginState];
    }
    // 第一次不交换，之后每次都要交换
    else if (direction === 'alternate' && currentCount > 0) {
      [this.beginState, this.endState] = [this.endState, this.beginState];
    }
    // 每次都要交换
    else if (direction === 'alternate-reverse') {
      [this.beginState, this.endState] = [this.endState, this.beginState];
    }
  }

  start() {
    this._setStatesByDirection();

    this.startTime = Date.now();
    setTimeout(this._doAnime.bind(this), this.delay);
  }

  pause() {
    if (this.isFinished) return;
    this.isPaused = true;
  }

  resume() {
    if (this.isFinished) return;
    this.startTime = Date.now() - this.currentTime - this.delay;
    this.isPaused = false;
    this._doAnime();
  }

  private _doAnime() {
    const { beginState, endState, currentState, duration, tween, delay } = this;
    const change: AnyNumberProps = {};
    for (const attr in endState) {
      change[attr] = endState[attr] - beginState[attr];
    }
    
    this.isStarted = true;
    const anim = () => {
      if (this.isPaused) return;
      this.currentTime = Math.min(duration, Date.now() - this.startTime - delay);
      for (const attr in endState) {
        currentState[attr] = tween(this.currentTime, beginState[attr], change[attr], duration);
      }
      
      this.onAnim(currentState);

      let finishOnce = true;
      for (const attr in endState) {
        if (currentState[attr] !== endState[attr]) {
          finishOnce = false;
          break;
        }
      }
      if (finishOnce) {
        this.onFinishOnce();

        this.currentCount++;
        if (this.currentCount < this.count) {
          // 重置状态
          if (this.direction === 'normal' || this.direction === 'reverse') {
            this.onAnim(beginState);
          }
          this.start();
        } else {
          this.isFinished = true;
          this.onFinish();
        }

      } else {
        requestAnimationFrame(anim);
      }
    }
    anim();
  }

  onAnim(values:{[key:string]:any}) {}

  onFinishOnce() {}

  onFinish() {}
}