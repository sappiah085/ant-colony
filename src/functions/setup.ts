import p5 from "p5";
import { variables } from "../common/variables";
import { Food } from "../classes/food";
export let food: Food;
export function setup(p5: p5): void {
  p5.createCanvas(variables.dimension, variables.dimension);
  p5.background(0);
  food = new Food(p5.createVector(variables.x + 300, variables.y + 300));
}
