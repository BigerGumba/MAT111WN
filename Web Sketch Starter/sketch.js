export let flag = [true, 
            false, false, false, false, false,
            false, false, false, false
];
/*
  FLAGS GUIDE
  0 = Started new game?
  1 = Reached Scene 0?
  2 = Reached Scene 3?
  3 = Reached Scene 4?
  4 = Reached Scene 5?
  5 = Reached Scene 6?
  6 = Reached Scene 9?
  7 = Initiated?
  8 = Paused?
  9 = In Save Animation?
*/
let defaultFlags = [true];

let state = "T";
/*
  STATE GUIDE
  "I" = Idle, can move
  "D" = Dialogue, when dialogue box appears
  "C" = Cutscene, all interaction and movement paused for a while
  "T" = Title Screen, only Mouse input is registered
  "P" = Paused
*/

let x = 200;
let y = 200;
export let s = 999;
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

class dialogue_box {
  constructor(tID) {
    this.tID = tID;
    this.c = 0;
    this.string = "";
    this.speaker = "";
  }
  boxDraw() {
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


    text(this.string, width / 2, (height * 17)/20, (width*9)/10,(height*1)/5);

  }
}

let menuSS = [];

let charSS = [];

let bossSS = [];

let npcSS = [];

let enviroSSVirt = [];

let enviroSSDeep = [];

let enviroSSReal = [];

function preload() {
  menuSS.push(load("./assets/menu/gamelogo.png"));
  menuSS.push(load("./assets/menu/menu_newgame.png"));
  menuSS.push(load("./assets/menu/menu_back.png"));
  menuSS.push(load("./assets/menu/menu_disclaimer.png"));
  menuSS.push(load("./assets/menu/menu_disclaimertext.png"));
  menuSS.push(load("./assets/menu/menu_sceneselect_off.png"));
  menuSS.push(load("./assets/menu/menu_sceneselect_on.png"));
  menuSS.push(load("./assets/menu/menu_ss1.png"));
  menuSS.push(load("./assets/menu/menu_ss2.png"));
  menuSS.push(load("./assets/menu/menu_ss3.png"));
  menuSS.push(load("./assets/menu/menu_ss4.png"));
  menuSS.push(load("./assets/menu/menu_ss5.png"));
  menuSS.push(load("./assets/menu/menu_ss6.png"));
  menuSS.push(load("./assets/menu/menu_ss7.png"));
  menuSS.push(load("./assets/menu/menu_sslocked.png"));
}

async function setup() {
  dialogueFile = await fetch("./dialogue.json");
  const c = createCanvas(400, 400);
  c.parent('sketch');

  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER,CENTER);
  noSmooth();
}

function draw() {
  switch (s) {
    case 0:
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      break;
    case 7:
      break;
    case 8:
      break;
    case 9:
      break;
    case 100:
      break;
    case 101:
      break;
    case 102:
      break;
    case 103:
      break;
    case 104:
      break;
    case 200:
      break;
    case 300:
      background(0);
      image(menuSS[0], 400, 100);
      break;
    case 301:
      break;
    case 302:
      break;
    case 303:
      break;
    case 999:
      background(0);
      return;
  }

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
}

function changeState(newState) {
  switch (newState) {
    case "I":
      break;
    case "D":
      break;
    case "C":
      break;
    case "T":
      break;
    case "P":
      break;
  }
  state = newState;
}

function mousePressed() {
  interact();
}

function keyPressed() {
  if (key === "z") {
    interact();
  }
  if ((key === ESCAPE) && (state in ["I", "D"])) {
    changeState("P");
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