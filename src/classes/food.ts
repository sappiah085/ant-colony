import p5 from "p5";

export class Food {
  position: p5.Vector;
  decay: number = 50;
  constructor(position: typeof this.position) {
    this.position = position;
  }
  update() {
    this.decay -= 0.05;
  }
  finished() {
    return this.decay <= 0;
  }
  draw(p5: p5) {
    p5.fill(255, 150, 50); // Orange color for the toffee body
    p5.rectMode(p5.CENTER);
    p5.rect(this.position.x, this.position.y, 150, 50, 20); // Rounded rectangle as the toffee

    // Wrapper (left side)
    p5.fill(255, 200, 100); // Lighter orange for the wrapper
    p5.triangle(
      this.position.x - 75,
      this.position.y - 25,
      this.position.x - 75,
      this.position.y + 25,
      this.position.x - 120,
      this.position.y
    );

    // Wrapper (right side)
    p5.triangle(
      this.position.x + 75,
      this.position.y - 25,
      this.position.x + 75,
      this.position.y + 25,
      this.position.x + 120,
      this.position.y
    );

    // Decorative lines on the toffee body
    p5.stroke(255, 100, 0);
    p5.strokeWeight(3);
    let offset = 20;
    p5.line(
      this.position.x - offset,
      this.position.y - 20,
      this.position.x - offset,
      this.position.y + 20
    );
    p5.line(
      this.position.x + offset,
      this.position.y - 20,
      this.position.x + offset,
      this.position.y + 20
    );
  }
}
