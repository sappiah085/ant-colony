import p5 from "p5";
import { Ant } from "./ant";
import { variables } from "../common/variables";
import { Food } from "./food";

export class Colony {
  _ants: Ant[];
  _position: { x: number; y: number };
  constructor(x: number, y: number) {
    this._ants = [];
    this._position = { x, y };
  }
  createAnts(n: number) {
    for (let i = 0; i < 2 * Math.PI; i += Math.PI / n) {
      this._ants.push(
        new Ant(p5.Vector.fromAngle(i, variables.x), this._position)
      );
    }
    return this;
  }

  draw(p5: p5, food: Food) {
    food.update();
    p5.noStroke();
    for (let v of this._ants) {
      if (food.finished()) v._seenFood = false;
      if (!food.finished()) v.attractedToFood(food.position);
      v.takeHome(p5);
      v.drawPheromone(p5);
      v.followTrailToFood();
      v.move(variables.dimension);
      v.display(p5);
    }
    p5.fill(139, 69, 19);
    p5.ellipse(variables.x, variables.y - 50, 200, 100); // Base of the hill
    p5.fill(139, 89, 39);
    p5.ellipse(variables.x, variables.y - 100, 150, 75); // Middle of the hill
    p5.fill(139, 69, 19);
    p5.ellipse(variables.x, variables.y - 150, 100, 50); // Top of the hill
    p5.circle(variables.x, variables.y, variables.dimension / 6);
    if (!food.finished()) {
      // p5.fill(218, 165, 32, p5.constrain(food.decay, 0, 1) * 255);
      // p5.circle(food.position.x, food.position.y, variables.dimension / 15);
      food.draw(p5);
    }
  }
}
