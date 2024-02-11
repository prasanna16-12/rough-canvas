export const getDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  let x = Math.abs(x2 - x1);
  let y = Math.abs(y2 - y1);
  return x > y ? x : y;
}


export const calcAngleDegrees = (x1: number, y1: number,x2: number, y2: number): number => {
  return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 180;
}