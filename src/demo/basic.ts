import Canvex from "../canvex";
import { Node } from "../canvex/Node";
import { Vec2D } from "../canvex/Vec2D";
import ypng from "../assets/1.png";


const { 
  Circle,
  Stage,
  Polygon,
  Line,
  Rect,
} = Canvex;

const demo_basic = () => {
  const stage = new Stage("#demo-basic");

  // 直线
  const p1:Vec2D[] = [{x:50, y:50}, {x:50, y:200}];
  const line1 = new Line({points: p1, lineWidth: 1, color: 'black'});
  stage.appendElement(line1);

  const p3:Vec2D[] = [{x:100, y:30}, {x:100, y:200}];
  const line3 = new Line({points: p3, lineWidth: 6, color: 'rgba(200, 200, 200, .6)'});
  stage.appendElement(line3);

  // 矩形
  const rect = new Rect({x: 150, y: 100, width: 60, height: 100, draggable: true, background: '#7367F0'});
  stage.appendElement(rect);


  // 多边形
  const points = [
    {x: 200, y:80},
    {x: 250, y:100},
    {x: 250, y:150},
    {x: 220, y:150},
    {x: 200, y:100},
  ]
  const polygon = new Polygon({points, draggable: true, background: 'rgb(71,198,162)', rotate: 45});
  stage.appendElement(polygon);

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

  // 图片背景
  const imgRect = new Rect({x: 320, y: 100, width: 80, height: 100});
  stage.appendElement(imgRect);
  readFileToSetBackground(imgRect)

  const imgCircle = new Circle({x: 430, y: 100, radius: 50});
  stage.appendElement(imgCircle);
  readFileToSetBackground(imgCircle)

  // 动画性能测试
  // for (let i = 0; i < 40; i++) {
  //   const animCircle = new Circle({x: 100, y: 600, radius: 30, draggable: true, background: 'white', borderColor: 'black'});
  //   stage.appendElement(animCircle);
  //   const anim1 = new Anim({
  //     from: animCircle,
  //     to: {
  //       x: 600,
  //       y: 700,
  //       radius: 60
  //     },
  //     duration: 2000,
  //     delay: i * 10,
  //     count: Infinity,
  //     direction: 'alternate',
  //     tween: Tween['ease-in-out']
  //   });
  //   anim1.onAnim = (values) => {
  //     animCircle.setAttrs(values);
  //   };
  //   anim1.start();
  // }

}

demo_basic();

export {}