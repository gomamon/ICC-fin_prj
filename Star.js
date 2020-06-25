class Star {
    constructor() {
      this.x = random(width);
      this.y = random(height);
      this.size = random(0.35, 5);
      this.color = color(random(150,230), random(150,230), random(150, 230));
      this.t = random(TAU);
    }
  
    draw() {
      this.t += 0.1;
      var scale = this.size + sin(this.t) * 3;
      noStroke();
      fill(this.color);
      ellipse(this.x, this.y, scale, scale);
    }
  }