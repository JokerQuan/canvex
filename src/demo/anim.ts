import Canvex from '../canvex';

const { Stage, Circle, Anim, Polygon, Tween } = Canvex;

export const demo_anim = () => {
  const stage = new Stage("#demo-anim");
  
  // 动画
  const animCircle = new Circle({x: 100, y: 60, radius: 30, background: 'white', borderColor: 'black'});
  stage.appendElement(animCircle);
  const anim1 = new Anim({
    from: animCircle,
    to: {
      x: 120,
      y: 220,
      radius: 60
    },
    duration: 1000,
    count: Infinity,
    direction: 'alternate',
    tween: Tween['ease-in-out']
  });
  anim1.onAnim = (values) => {
    animCircle.setAttrs(values);
  };
  anim1.onFinish = () => {
    animCircle.setAttrs({background: 'skyblue'});
  }
  anim1.start();
  animCircle.onHover = () => {
    anim1.pause();
  }
  animCircle.onHoverOut = () => {
    anim1.resume();
  }
  

  // 旋转
  const points = [
    {x: 300, y:80},
    {x: 350, y:100},
    {x: 350, y:200},
    {x: 320, y:250},
    {x: 300, y:200},
  ]
  const rect2 = new Polygon({points, draggable: true, background: 'rgb(23,141,249)'});
  stage.appendElement(rect2);
  const anim = new Anim({
    from: {
      rotate: 0,
    },
    to: {
      rotate: 360
    },
    duration: 2000,
    count: Infinity,
    tween: Tween.linear
  });
  anim.start();
  anim.onAnim = (v) => {
    rect2.setAttrs(v);
  };
  rect2.onHover = () => {
    anim.pause();
  }
  rect2.onHoverOut = () => {
    anim.resume();
  }
}

demo_anim();