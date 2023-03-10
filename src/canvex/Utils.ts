
// p 点绕 q 点旋转 angle 角度后的坐标
export const rotatePoint = (px: number, py: number, qx: number, qy: number, angle: number) => {
  const x = (px - qx) * Math.cos(Math.PI / 180 * angle) - (py - qy) * Math.sin(Math.PI / 180 * angle) + qx;
  const y = (px - qx) * Math.sin(Math.PI / 180 * angle) + (py - qy) * Math.cos(Math.PI / 180 * angle) + qy;
  return { x, y };
}