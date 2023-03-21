import Canvex from '../canvex';

const { Stage, Circle, Rect } = Canvex;

export const demo_radial = () => {
  const stage = new Stage("#demo-radial");

  // 径向渐变
  const radial = {
    colors: ['#2CD8D5', '#6B8DD6', '#8E37D7']
  }
  const circleR = new Circle({x: 150, y: 150, radius: 80, background: radial});
  stage.appendElement(circleR);

  // 线性渐变
  const linear = {
    direction: 'left',
    colors: ['red', 'orange', 'blue', 'green']
  };
  const rect1 = new Rect({x: 350, y: 150, width: 150, height: 150, background: linear});
  stage.appendElement(rect1);
}

demo_radial();