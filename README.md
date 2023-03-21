# Canvex
简单易用的 Canvas 渲染引擎，基于 canvas 2d 绘图 API 封装。
---
### demo
```javascript
import Canvex from "../canvex";
const {  Stage, Line, Rect, } = Canvex;
const stage = new Stage("#demo-basic");

// 直线
const p1:Vec2D[] = [{x:50, y:50}, {x:50, y:200}];
const line1 = new Line({points: p1, lineWidth: 1, color: 'black'});
stage.appendElement(line1);

// 矩形
const rect = new Rect({x: 150, y: 100, width: 60, height: 100, draggable: true, background: '#7367F0'});
stage.appendElement(rect);
```
>更多 demo 请查看 [demo](https://github.com/JokerQuan/canvex/tree/main/src/demo) 文件夹。


### 特性
- 基本图形元素
- 支持阴影、渐变、背景图片
- 支持旋转、缩放、平移
- 支持拖拽、Hover、点击事件
- 支持动画，可自定义动画曲线


### TODO
- 使用 skia-wasm 重写绘制功能，提高性能。
- 文本元素
- 更多基础图形元素
- 支持 Group
- 支持图层操作
- ......