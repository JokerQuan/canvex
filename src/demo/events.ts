import Canvex from '../canvex';

const { Stage, Rect, Circle } = Canvex;

export const demo_events = () => {
  const stage = new Stage("#demo-events");

  // 点击事件
  const rect = new Rect({x: 100, y: 150, width: 100, height: 120, draggable: true, background: 'skyblue'});
  rect.onClick = () => {
    rect.setAttrs({background: rect.background === 'skyblue' ? '#7367F0' : 'skyblue'})
  }
  stage.appendElement(rect);

  // hover
  const hoverParent = new Circle({x: 300, y: 120, radius: 50, draggable: true, background: 'white', borderColor: 'black'});
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

  const hoverChild = new Circle({x: 300, y: 120, radius: 30, draggable: true, background: 'white', borderColor: 'black'});
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

demo_events();