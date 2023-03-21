import Canvex from '../canvex';

const { Stage, Rect, Polygon } = Canvex;

export const demo_options = () => {
  const stage = new Stage("#demo-options");

  // 阴影
  const rect = new Rect({x: 300, y: 100, width: 100, height: 100, background: 'skyblue', shadowColor: "black", shadowOffsetX:10, shadowOffsetY: 10, shadowBlur: 5, shadowOpacity: 1});
  stage.appendElement(rect);
  
  // 透明度
  const tPoints = [
    {x: 300, y:100},
    {x: 350, y:200},
    {x: 210, y:250},
  ]
  const triangle = new Polygon({points: tPoints, draggable: true, background: 'orange', opacity: 0.3});
  stage.appendElement(triangle);
}

demo_options();