let flag = [true];
/*
  FLAGS GUIDE
  0 = Started new game?
  1 = Reached Scene 0?
  2 = Reached Scene 3?
  3 = Reached Scene 4?
  4 = Reached Scene 5?
  5 = Reached Scene 6?
  6 = Reached Scene 9?
*/

let state = "I";
/*
  STATE GUIDE
  "I" = Idle, can move
  "D" = Dialogue, when dialogue box appears
  "C" = Cutscene, all interaction and movement paused for a while
  "T" = Title Screen, only Mouse input is registered
*/

let x = 200;
let y = 200;
let s = 999;
/*
  SCENE GUIDE
  0 = Real Home
  1 = Virtual Home
  2 = Work Hub
  3 = First Layer
  4 = Second Layer
  5 = Third Layer / Chase
  6 = Real Home Blackout
  7 = Hallway
  8 = Elevator Room
  9 = Boss Room
  100 = Ending 0
  101 = Ending 1
  102 = Ending 2
  103 = Ending 3
  104 = Ending 4
  200 = Intro Cutscene
  300 = Title Screen
  301 = Scene Select Screen
  302 = Credits Screen
  303 = Disclaimer Screen
  999 = Pre-Initiation
*/

let dialogueFile;
let tID = 0;

async function setup() {
  dialogueFile = await fetch("dialogue.json");
  const c = createCanvas(400, 400);
  c.parent('sketch');  // attach canvas inside the <div id="sketch">
  rectMode(CENTER);
  textAlign(CENTER,CENTER);
}

function draw() {
  background(220);

  if (state == "I") {
    if (keyIsDown(UP_ARROW)){
      y+= -0.2 * deltaTime;
    }
    if (keyIsDown(DOWN_ARROW)) {
      y+= 0.2 * deltaTime;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      x+= 0.2 * deltaTime;
    }
    if (keyIsDown(LEFT_ARROW)) {
      x+= -0.2 * deltaTime;
    }
    if (x < -150) {
      x = 549;
    }
    if (x > 550) {
      x = -149;
    }
    if (y < -150) {
      y = 549;
    }
    if (y > 550) {
      y = -149;
    }
  }
  stroke(0);
  if (detectArea(150, 60, 250, 140) && state == "I") {
    movingText("Press Z to Interact!", 200, 80);
  }
  
  if (state == "D") {
    textSize(16);
    textbox(color(0));
    textSize(8);
  }
  movingRect(200, 100, 30, 30);
  rect(width / 2, height / 2,20,20);
  
}

function mousePressed() {
  interact();
}

function keyPressed() {
  if (key === "z") {
    interact();
  }
}

function interact() {
  if (state == "D") {
    nID = tID;
    switch (tID) {
      case 0:
        state = "I";
        break;
      case 1:
        nID = 2;
        break;
      case 2:
        nID = 3;
        break;
      case 3:
        nID = 4;
        break;
      case 4:
        nID = 5;
        break;
      case 5:
        state = "I";
        break;
      case 6:
        state = "I";
        break;
    }
    tID = nID;
  }
  else {
    if (detectArea(150, 60, 250, 140) && state == "I") {
      state = "D";
      if (flag[0]) {
        flag[0] = false;
        tID = 1;
      }
      else {
        tID = 6;
      }
    }
  }
}

function detectArea(tlx, tly, brx, bry) {
  return ((x > tlx) && (x < brx) && (y > tly) && (y < bry));
}

function movingRect(px, py, lx, ly) {
  rect(px + 200 - x, py + 200 - y, lx, ly);
}

function movingText(string, px, py) {
  text(string, px + 200 - x, py + 200 - y);
}

function textbox(newStroke) {
  circle((width / 2) - (width * 4) / 10, (height * 8)/10, 40);
  circle((width / 2) - (width * 4) / 10, (height * 9)/10, 40);
  circle((width / 2) + (width * 4) / 10, (height * 8)/10, 40);
  circle((width / 2) + (width * 4) / 10, (height * 9)/10, 40);
  noStroke();
  rect(width / 2, (height * 17)/20, (width * 8) / 10, (height * 1) / 5);
  rect(width / 2, (height * 17)/20, (width * 9) / 10, (height * 1) / 10);
  stroke(newStroke);
  line((width / 2) - (width * 4) / 10, (height * 19)/20, (width / 2) + (width * 4) / 10, (height * 19)/20);
  line((width / 2) - (width * 4) / 10, (height * 15)/20, (width / 2) + (width * 4) / 10, (height * 15)/20);
  line((width / 2) - (width * 9) / 20, (height * 16)/20, (width / 2) - (width * 9) / 20, (height * 18)/20);
  line((width / 2) + (width * 9) / 20, (height * 16)/20, (width / 2) + (width * 9) / 20, (height * 18)/20);

  let string = "FATAL ERROR!";
  let speaker = "";

  text(string, width / 2, (height * 17)/20, (width*9)/10,(height*1)/5);
}

class bossSphere {
  constructor(px, py, theta, dtheta, velocity) {
    
  }
  destructor() {
    
  }
}

class bossHomingLaser {
  constructor(sx, sy) {
    
  }
}

class bossShockTile {
  constructor(sx, sy, fakeOut, hasWarning) {
    
  }
}