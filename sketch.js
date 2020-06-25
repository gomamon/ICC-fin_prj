
let bgm;
let analyzer;
let fonts=[];

let bigFontSize=30;
let smallFontSize=20;

let stars = [];
let clouds = [];
let cloud_cnt = 0;
let quots = [
  "We need men who can dream of things never were.",
  "To climb steep hills requires slow pace at first.",
  "The human race has one really effective weapon, and that is laughter.",
  "We never know the worth of water till the well is dry.",
  "Weak things united become strong.",
  "The most beautiful thing in the world is, of course, the world itself.",
  "The only way to do it is to do it.\n- Merce Cunningham",
  "Everything you can imagine is real.\n- Pablo Picasso",
  "Life is a process. We are a process. The universe is a process.\n- Anne Wilson Schaef",
  "Learn from Yesterday, live for Today, hope for Tomorrow.\n- Albert Einstein",
  "It's not whether you get knocked down; It's whether you get back up.\n- Vince Lombardi",
  "An obstacle is often a stepping stone. - Prescott Bush",
  "If you're going through hell, keep going.\n- Winston Churchill"
];

let months = ["January", "February", "March", "April", "May", "June", "July", "August","September", "Octaber","November","December"];
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

  fonts.push(loadFont('./font/Quicksand.ttf'));
  bgm = loadSound('./music/Family_Montage.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  bgm.loop();
  analyzer = new p5.Amplitude();
  stroke(255);

  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.6;
  minutesRadius = radius * 0.5;
  hoursRadius = radius * 0.4;

  minDiameter = radius * 0.7;
  maxDiameter = radius * 1.2;

  bigFontSize = map(width, 100, 1500,25,35);
  smallFontSize = map(width, 100, 1500,15,20);

  cx = width / 2;
  cy = height / 2;
}

let vols = [];

function draw() {
  bgm.amp(0.5);

  background(0);
  var color1 = color(101, 54, 128);
  var color2 = color(57, 75, 135);
  bgGradation(0, 0, color1, color2);

  drawStar();
  drawCloud();
  drawCity();
  drawClock();
  drawText();
}



let alignWidthSize;
function drawText(){
  let y = year();
  let m = month();
  let d = day();
  alignWidthSize = (width/2);

  textSize(bigFontSize);
  fill(255);
  noStroke();
  textFont(fonts[0]);
  textAlign(CENTER, BASELINE);
  let data = months[m-1]+" "+d+"th, "+y;
  text(data, width-alignWidthSize, height-height/8, alignWidthSize);
  textSize(smallFontSize);
  text(quots[hour()%13],width-alignWidthSize, height-height/11, alignWidthSize);
}

function drawCloud(){
  if(cloud_cnt == 0){
    let newCloud = new Cloud;
    clouds.push(newCloud);    
  }
  cloud_cnt++;
  cloud_cnt %= 220;

  for(let i=0; i<clouds.length; i++){
    clouds[i].draw();
    if(clouds[i].getX()>width){
      clouds.splice(i,1);
    }
  }
}


function drawStar(){
  for(let i=0; i<40; i++){
    let newStar = new Star();
    stars.push(newStar);
    stars[i].draw();
  }  
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
  fill(0);

  translate(width / 2, height / 2);

  beginShape();
  for (let i = 0; i < vols.length; i++) {
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

  push();
  translate(windowWidth / 2, windowHeight / 2);
  pop();

  stroke(255);
  strokeWeight(2);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(3);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(6);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);


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