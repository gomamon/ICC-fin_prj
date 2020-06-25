
let bgm;
let analyzer;
let cats = [];
let block = [];
let running_man = [];
let running_cnt = 1;
let maxDiameter;
let minDiameter;
let pen;

function preload() {
  for (let i = 1; i <= 13; i++) {
    let name = "./images/l" + i + ".png";
    loadImage(name, img => {
      running_man.push(img);
    })
  }
  // pen = loadImage("./images/studying.gif");
  bgm = loadSound('./music/Family_Montage.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // angleMode(DEGREES)
  bgm.loop();
  analyzer = new p5.Amplitude();
  //analyzer.setInput(bgm);
  stroke(255);

  // frameRate(40);

  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  // clockDiameter = radius * 1.7;
  minDiameter = radius * 0.7;
  maxDiameter = radius * 1.3;

  cx = width / 2;
  cy = height / 2;
}

let vols = [];

function draw() {
  background(0);
  var color1 = color(0, 0, 63);
  var color2 = color(75, 0, 130);
 // bgGradation(0, 0, color1, color2);


  drawCity();
  drawClock();

  let frame = floor(frameCount / 2.5) % 72;
  push();
  translate(cx, cy);
  //image(pen, 0,0,400,400,frame*400,0,400,400);
  pop();

}


function bgGradation(x, y, c1, c2) {
  noFill();
  for (let i = y; i <= y + height; i++) {
    var inter = map(i, y, y + height, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + width, i);
    
  }
}

function drawCity() {
  let vol = analyzer.getLevel();
  vols.push(vol);

  push();
  stroke(255);
  noFill();

  translate(width / 2, height / 2);



  beginShape();
  for (let i = 0; i < 360; i++) {
    let angle = radians(i - 90);
    let r = map(vols[i], 0, 1, minDiameter, maxDiameter);
    let x = r * cos(angle);
    let y = r * sin(angle);
    if (i == 0) {
      image(running_man[ceil(running_cnt)], x, y - 50, running_man[ceil(running_cnt)].width * 0.5, running_man[ceil(running_cnt)].height * 0.5);
    }
    vertex(x, y);
  }

  endShape();
  pop();


  running_cnt += 0.5;
  if (running_cnt > 12) running_cnt = 1;

  if (vols.length > 360) {
    vols.splice(0, 1);
  }
}

function drawClock() {
  let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;


  // if (cats.length == 0) {
  //   let newcat = new Cat(color(random(150, 255), random(150, 240), random(100, 200)),
  //     color(random(50, 200), random(50, 200), random(50, 220)),
  //     color(random(50, 150), random(100, 240), random(100, 240)),
  //     0, int(random(0, 3)), 100);
  //   cats.push(newcat);
  // }

  push();
  translate(windowWidth / 2, windowHeight / 2);
  pop();
  // Draw the hands of the clock
  stroke(255);
  strokeWeight(2);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(3);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(6);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);

  // Draw the minute ticks
  strokeWeight(2);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 30) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  for (let a = 0; a < 360; a += 30) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  endShape();

}