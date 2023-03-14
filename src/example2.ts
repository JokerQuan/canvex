import Canvex from './canvex';

const { Stage, Rect, Anim } = Canvex;

// 图表动画大体思路，待封装
export const example2 = () => {
  const stage = new Stage("#container2");
  const data = [
      [18.9, 28.8, 39.3, 81.4, 47, 20.3, 24, 35.6],
      [18.9, 23.2, 34.5, 99.7, 52.6, 35.5, 37.4, 42.4]
  ];

  const yMax = 200;
  const { canvasWidth, canvasHeight } = stage.getCanvasSize();
  const perYHeight = canvasHeight / yMax;
  const perXWidth = canvasWidth / data[0].length;
  const halfWidth = 25;
  let isStartState = true;

  const startStates0 = data[0].map((d, index) => {
    return {
      x: (index + 0.5) * perXWidth - halfWidth / 2, 
      y: canvasHeight - perYHeight * d / 2, 
      width: halfWidth, 
      height: perYHeight * d, 
    };
  })
  const startStates1 = data[1].map((d, index) => {
    return {
      x: (index + 0.5) * perXWidth + halfWidth / 2, 
      y: canvasHeight - perYHeight * d / 2, 
      width: halfWidth, 
      height: perYHeight * d, 
    };
  })
  
  const endStates0 = data[0].map((d, index) => {
    return {
      x: (index + 0.5) * perXWidth, 
      y: canvasHeight - perYHeight * d / 2, 
      width: halfWidth * 2, 
      height: perYHeight * d, 
    };
  })
  const endStates1 = data[1].map((d, index) => {
    return {
      x: (index + 0.5) * perXWidth, 
      y: canvasHeight - perYHeight * (d / 2 + data[0][index]), 
      width: halfWidth * 2, 
      height: perYHeight * d, 
    };
  })
  

  const rects0 = startStates0.map((d) => {
    const { x, y, width, height } = d;
    const rect = new Rect({x, y, width, height, background: 'rgb(47,194,91)'});
    stage.appendElement(rect);
    return rect;
  })
  
  const rects1 = startStates1.map((d) => {
    const { x, y, width, height } = d;
    const rect = new Rect({x, y, width, height, background: 'rgb(24,144,255)'});
    stage.appendElement(rect);
    return rect;
  })

  const doAnim = () => {
    let toStates0:any = null, toStates1:any = null;
    if (isStartState) {
      toStates0 = endStates0;
      toStates1 = endStates1;
    } else {
      toStates0 = startStates0;
      toStates1 = startStates1;
    }
    isStartState = !isStartState;

    rects0.forEach((r, index) => {
      const anim = new Anim({from: r, to: toStates0[index], duration: 500});
      anim.start();
      anim.onAnim = (values) => {
        r.setAttrs(values);
      }
    })
    rects1.forEach((r, index) => {
      const anim = new Anim({from: r, to: toStates1[index], duration: 500});
      anim.start();
      anim.onAnim = (values) => {
        r.setAttrs(values);
      }
    })
  }

  stage._canvas.addEventListener('click', doAnim)
  
}

example2();