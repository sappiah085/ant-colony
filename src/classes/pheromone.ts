import p5 from "p5";

export class Pheromone {
  _strength: number = 3;
  _position: p5.Vector;
  originalCoordinate: { x: number; y: number };
  constructor(position: typeof this.originalCoordinate, p5: p5) {
    this._position = p5.createVector(position.x, position.y);
    this.originalCoordinate = position;
  }
  update() {
    this._strength -= 0.2;
  }
  isFaded() {
    return this._strength <= 0;
  }
}
