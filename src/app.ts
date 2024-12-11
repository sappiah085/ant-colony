import "p5/lib/addons/p5.dom";import { draw } from "./functions/draw";
import { setup } from "./functions/setup";
import { variables } from "./common/variables";
import { Colony } from "./classes/colony";
import P5 from "p5";
// import "p5/lib/addons/p5.sound";


const sketch = (p5: P5) => {
  p5.setup = () => setup(p5);
  p5.draw = () => draw(p5);
};

new P5(sketch);
