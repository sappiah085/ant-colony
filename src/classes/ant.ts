import p5, { Vector } from "p5";
import { variables } from "../common/variables";
import { Pheromone } from "./pheromone";

export class Ant {
  position: p5.Vector;
  velocity: p5.Vector;
  _home: { x: number; y: number };
  _seenFood: boolean = false;
  speed: number = Math.random() * 2;
  _takingHome: boolean = false;
  _pheromone: Pheromone[] = [];
  _gotHome: boolean = false;
  _strength_of_food_traction: number = 0.2;
  _strength_of_pheromone_traction: number = 0.08;
  _strength_of_colony_traction: number = 0.4;
  constructor(position: p5.Vector, colony: { x: number; y: number }) {
    this.position = position.add(colony.x, colony.y);
    this._home = colony;
    this.velocity = p5.Vector.random2D(); // Start with random direction
  }

  drawPheromone(p5: p5) {
    p5.noFill();
    p5.noStroke();
    p5.strokeWeight(4);
    p5.beginShape();
    if (p5.frameCount % 20 === 0 && this._seenFood)
      this._pheromone.push(
        new Pheromone({ x: this.position.x, y: this.position.y }, p5)
      );
    if (this._pheromone.length > 0) {
      p5.stroke(0,0,255, 150);

      for (let v = 0; v < this._pheromone.length; v++) {
        if (p5.frameCount % 10 === 0) {
          this._pheromone[v].update();
        }
        p5.vertex(
          this._pheromone[v].originalCoordinate.x,
          this._pheromone[v].originalCoordinate.y
        );
      }
    }
    p5.vertex(this.position.x, this.position.y);
    p5.endShape();
    this.removePheromone();
  }

  followTrailToFood() {
    if (this._pheromone.length != 0 && this._gotHome) {
      let closest_pheromone = null;
      let closest_distance = Infinity;
      for (let p = this._pheromone.length - 1; p >= 0; p--) {
        let d = this._pheromone[p]._position.dist(this.position);
        if (d < closest_distance) {
          closest_distance = d;
          closest_pheromone = this._pheromone[p];
        }
      }
      this.attractToTarget(closest_pheromone?._position as p5.Vector);
    }
  }
  attractToTarget(target: p5.Vector) {
    let traction = target.sub(this.position);
    traction.setMag(this._strength_of_pheromone_traction);
    this.velocity.add(traction);
  }
  // Display the ant
  display(p5: p5) {
    p5.fill(255);
    p5.noStroke();
    p5.ellipse(this.position.x, this.position.y, 4, 4); // Draw the ant
  }

  attractedToFood(target: p5.Vector) {
    if (!this._seenFood || !this._takingHome) {
      let attraction: number | p5.Vector = p5.Vector.dist(
        target,
        this.position
      ); // Direction to the food
      if (attraction > variables.dimension / 30) {
        attraction = p5.Vector.sub(target, this.position);
        attraction.setMag(this._strength_of_food_traction); // Weak attraction force
        this.velocity.add(attraction); // Adjust velocity toward the food
      } else {
        this._seenFood = true;
        this._takingHome = true;
      }
    }
  }

  takeHome(p5: p5) {
    let hp = p5.createVector(this._home.x, this._home.y);
    if (this._seenFood && this._takingHome) {
      let homeTraction: number | Vector = hp.dist(this.position);
      if (homeTraction < variables.dimension / 32) {
        this._takingHome = false;
        this._gotHome = true;
      } else {
        homeTraction = hp.sub(this.position);
        homeTraction.setMag(this._strength_of_colony_traction);
        this.velocity.add(homeTraction);
      }
    }
  }
  removePheromone() {
    this._pheromone = this._pheromone.filter(
      (pheromone) => !pheromone.isFaded()
    );
  }
  // Move the ant
  move(cl: number) {
    // Randomly change direction occasionally
    if (Math.random() < 0.03) {
      this.velocity = p5.Vector.random2D();
    }
    // Occasionally pause for a moment
    if (Math.random() < 0.01) {
      this.velocity.mult(0); // Stop movement briefly
    } else {
      this.velocity.setMag(this.speed); // Reset speed
    }
    this.position.add(this.velocity);

    this.edges(cl);
  }

  // Handle edge cases
  edges(cl: number) {
    // Wrap around behavior
    if (this.position.x < -1 * cl) this.position.x = -cl;
    if (this.position.x > cl) this.position.x = cl;
    if (this.position.y < -1 * cl) this.position.y = -1 * cl;
    if (this.position.y > cl) this.position.y = cl;
  }
}
