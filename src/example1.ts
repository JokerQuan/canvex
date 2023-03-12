import Canvex from "./canvex";
import { Node } from "./canvex/Node";
import { Vec2D } from "./canvex/Vec2D";
import ypng from "./assets/1.png";


const { 
  Circle,
  Stage,
  Polygon,
  Line,
  Rect,
  Anim,
  Tween,
} = Canvex;

const example1 = () => {
  const stage = new Stage("#container1");

  // 辅助线
  const p1:Vec2D[] = [{x:10, y:390}, {x:150, y:100}];
  const p2:Vec2D[] = [{x:590, y:10}, {x:450, y:300}];
  const line1 = new Line({points: p1, lineWidth: 1, color: 'black'});
  const line2 = new Line({points: p2, lineWidth: 1, color: 'black'});
  stage.appendElement(line1);
  stage.appendElement(line2);

  // 起点终点直线
  const p3:Vec2D[] = [{x:10, y:390}, {x:590, y:10}];
  const line3 = new Line({points: p3, lineWidth: 6, color: 'rgba(200, 200, 200, .6)'});
  stage.appendElement(line3);

  // 贝塞尔曲线
  // const bezier = new Bezier({
  //   x: 10, y: 390, 
  //   ex: 590, ey: 10, 
  //   c1x: 150, c1y: 100,
  //   c2x: 450, c2y: 300,
  //   lineWidth: 6, 
  //   color: 'black'
  // });
  // stage.appendElement(bezier);

  const startCircle = new Circle({x: 10, y: 390, radius: 8, background: 'white', borderColor: 'black', draggable: true});
  const endCircle = new Circle({x: 590, y: 10, radius: 8, background: 'white', borderColor: 'black', draggable: true});
  const ctl1Circle = new Circle({x: 150, y: 100, radius: 8, background: 'red', borderColor: 'black', draggable: true});
  const ctl2Circle = new Circle({x: 450, y: 300, radius: 8, background: 'blue', borderColor: 'black', draggable: true});
  stage.appendElement(startCircle);
  stage.appendElement(endCircle);
  stage.appendElement(ctl1Circle);
  stage.appendElement(ctl2Circle);

  startCircle.onDrag = (x, y) => {
    startCircle.setAttrs({x, y});
    line1.setAttrs({x1: x, y1: y});
    line3.setAttrs({x1: x, y1: y});
    // bezier.setAttrs({x, y});
  }

  const get0_255 = () => {
    return Math.floor(Math.random() * 256);
  }

  const getRandomColor = () => {
    return `rgb(${get0_255()}, ${get0_255()}, ${get0_255()})`
  }

  ctl1Circle.onClick = () => {
    ctl1Circle.setAttrs({
      color: getRandomColor()
    })
  }

  // 矩形
  const rect = new Rect({x: 30, y: 40, width: 50, height: 60, draggable: true, background: 'skyblue'});
  rect.onClick = () => {
    rect.setAttrs({background: rect.background === 'skyblue' ? '#7367F0' : 'skyblue'})
  }
  rect.onDrag = (x, y) => {
    rect.setAttrs({x, y});
  }
  stage.appendElement(rect);

  // 线性渐变测试
  const linear = {
    direction: 'left',
    colors: ['red', 'orange', 'blue', 'green']
  };
  const rect1 = new Rect({x: 500, y: 400, width: 150, height: 150, draggable: true, background: linear});
  stage.appendElement(rect1);

  // 多边形测试
  const points = [
    {x: 500, y:630},
    {x: 550, y:650},
    {x: 550, y:750},
    {x: 520, y:800},
    {x: 500, y:750},
  ]
  const rect2 = new Polygon({points, draggable: true, background: linear, rotate: 45});
  stage.appendElement(rect2);
  rect2.onClick = () => {
    readFileToSetBackground(rect2)
  }
  rect2.onClick = () => {
    const anim = new Anim(rect2, {
      rotate: rect2.rotate + 50
    }, 1000, Tween.linear);
    anim.start();
    anim.onAnim = (v) => {
      rect2.setAttrs(v);
    };
  }
  rect2.onHover = () => {
    rect2.setAttrs({
      scaleX: 1.2,
      scaleY: 1.2
    });
  }
  rect2.onHoverOut = () => {
    rect2.setAttrs({
      scaleX: 1,
      scaleY: 1
    });
  }

  // 透明度测试
  const tPoints = [
    {x: 100, y:400},
    {x: 150, y:500},
    {x: 10, y:550},
  ]
  const triangle = new Polygon({points: tPoints, draggable: true, background: 'orange', opacity: 0.3});
  stage.appendElement(triangle);

  // 径向渐变测试
  const radial = {
    colors: ['#2CD8D5', '#6B8DD6', '#8E37D7']
  }
  const circleR = new Circle({x: 600, y: 200, radius: 80, background: radial, draggable: true});
  stage.appendElement(circleR);
  circleR.onClick = () => {
    circleR.setAttrs({opacity: 0.5});
  }

  // 图片背景测试
  const imgRect = new Rect({x: 700, y: 400, width: 150, height: 150, draggable: true, background: linear, style:'stroke'});
  stage.appendElement(imgRect);
  imgRect.onClick = () => {
    readFileToSetBackground(imgRect)
  }
  imgRect.onHover = () => {
    imgRect.setAttrs({rotate: 30});
  }
  imgRect.onHoverOut = () => {
    imgRect.setAttrs({rotate: 0});
  }

  const imgCircle = new Circle({x: 800, y: 200, radius: 80, draggable: true, borderColor: 'black'});
  stage.appendElement(imgCircle);
  imgCircle.onClick = () => {
    readFileToSetBackground(imgCircle)
  }

  // 读取文件作为背景图
  const readFileToSetBackground = async (ele:Node) => {
    const img = new Image();
    img.onload = () => {
      ele.setAttrs({
        backgroundImage: img
      })
    }
    img.src = ypng;
  }


  // 动画测试
  const animCircle = new Circle({x: 100, y: 600, radius: 30, draggable: true, background: 'white', borderColor: 'black'});
  stage.appendElement(animCircle);
  animCircle.onClick = () => {
    const anim1 = new Anim(animCircle, {
      x: 600,
      y: 700,
      radius: 60
    }, 3000, Tween.ease);
    anim1.onAnim = (values) => {
      animCircle.setAttrs(values);
    };
    anim1.onFinish = () => {
      animCircle.setAttrs({background: 'skyblue'});
    }
    anim1.start();
  }


  // hover 测试
  const hoverParent = new Circle({x: 800, y: 620, radius: 50, draggable: true, background: 'white', borderColor: 'black'});
  stage.appendElement(hoverParent);
  hoverParent.onHover = () => {
    hoverParent.setAttrs({
      background: 'skyblue',
      radius: 55
    });
  }
  hoverParent.onHoverOut = () => {
    hoverParent.setAttrs({
      background: 'white',
      radius: 50
    });
  }

  const hoverChild = new Circle({x: 800, y: 620, radius: 30, draggable: true, background: 'white', borderColor: 'black'});
  stage.appendElement(hoverChild);
  hoverChild.onHover = () => {
    hoverChild.setAttrs({
      background: 'orange',
      radius: 40
    });
  }
  hoverChild.onHoverOut = () => {
    hoverChild.setAttrs({
      background: 'white',
      radius: 30
    });
  }

}

example1();

export {}