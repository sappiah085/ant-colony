export const distanceBetweenAnt = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  let d = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  return d;
};
