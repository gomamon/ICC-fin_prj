
class Cat {
    constructor(bodycolor, patterncolor, eyecolor, personality, pattern, size) {
      this.bodycolor = bodycolor;
      this.patterncolor = patterncolor;
      this.eyecolor = eyecolor
      this.pattern = pattern;
      this.size = size;
      this.h = this.size * 0.7;
      this.w = this.size;
    }
  
    drawHead() {
      noStroke();
      fill(this.bodycolor);
      ellipse(0, 0, this.w, this.h);
      triangle(0, -this.h * 0.2, this.w * 0.4, -this.h * 0.8, this.w / 2, 0);
      triangle(-this.w / 2, 0, -this.w * 0.4, -this.h * 0.8, 0, -this.h * 0.2);
    }
  
    drawBody() {
      noStroke();
      fill(this.bodycolor);
      triangle(100, 100, 50, 250, 180, 250);
    }
  
    drawPattern() {
      fill(this.patterncolor);
      switch (this.pattern) {
        case 0: //no pattern
          break;
        case 1: //stripe
          push();
          ellipse(0, -this.h / 3, this.w * 0.07, this.h / 3);
          ellipse(this.h / 5, -this.h / 3, this.w * 0.07, this.h / 3.4);
          ellipse(-this.h / 5, -this.h / 3, this.w * 0.07, this.h / 3.4);
          pop();
          break;
        case 2:
          triangle(-this.w / 2, 0, -this.w * 0.4, -this.h * 0.8, 0, -this.h * 0.2);
          ellipse(-this.w / 4.4, -this.h / 4, this.w / 2.2, this.h / 2);
          break;
      }
    }
  
    drawEye() {
      fill(this.eyecolor);
  
      push();
      translate(this.w / 4, 0);
      ellipse(0, 0, this.w * 0.3, this.h * 0.2);
      fill("#000000");
      circle(0, 0, this.h * 0.15);
      pop();
  
      fill(this.eyecolor);
  
      push();
      translate(-(this.w / 4), 0);
      ellipse(0, 0, this.w * 0.3, this.h * 0.2);
      fill("#000000");
      circle(0, 0, this.h * 0.15);
      pop();
  
      fill("#000000");
      ellipse(0, this.h * 0.07, this.w * 0.12, this.h * 0.08);
  
    }
  
    drawCat() {
      this.drawHead();
  
  
      this.drawPattern();
      this.drawEye();
    }
  }
  