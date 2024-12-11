import p5 from "p5";
import { variables } from "../common/variables";
import { Colony } from "../classes/colony";
import { food } from "./setup";
import { Food } from "../classes/food";
let colonyAnts = new Colony(variables.x, variables.y).createAnts(200);
export const draw = (p5: p5) => {
  p5.clear();
  const food2 = new Food(p5.createVector(135, 75));
  colonyAnts.draw(p5, food);
  // colonyAnts.draw(p5, food2);
};
