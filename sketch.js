
let bgm;
let analyzer;

function preload() {
  bgm = loadSound('./music/Family_Montage.mp3');
  bgm_slow = loadSound('./music/Family_Montage.mp3');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgm.loop();
  analyzer = new p5.Amplitude();
  analyzer.setInput(bgm);
}


function draw() {
  background(255);

  // Get the average (root mean square) amplitude
  let rms = analyzer.getLevel();
  fill(127);
  stroke(0);

  // Draw an ellipse with size based on volume
  ellipse(width / 2, height / 2, 10 + rms * 200, 10 + rms * 200);
}

