let flag = [false, 
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
let defaultFlags = [false];

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

class dialogue_box {
  constructor(tID) {
    this.tID = tID;
    this.c = 0;
    this.string = "";
    this.speaker = "";
  }
  boxDraw() {
    fill(0);
    stroke(255);
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

let charSSReal = [];

let charSSVirt = [];

let bossSS = [];

let npcSS = [];

let enviroSSVirt = [];

let enviroSSDeep = [];

let enviroSSReal = [];

function preload() {
  menuSS.push(loadImage("./assets/menu/gamelogo.png"));
  menuSS.push(loadImage("./assets/menu/menu_newgame.png"));
  menuSS.push(loadImage("./assets/menu/menu_sceneselect_on.png"));
  menuSS.push(loadImage("./assets/menu/menu_back.png"));
  menuSS.push(loadImage("./assets/menu/menu_disclaimer.png"));
  menuSS.push(loadImage("./assets/menu/menu_disclaimertext.png"));
  menuSS.push(loadImage("./assets/menu/menu_sceneselect_off.png"));
  menuSS.push(loadImage("./assets/menu/menu_ss1.png"));
  menuSS.push(loadImage("./assets/menu/menu_ss2.png"));
  menuSS.push(loadImage("./assets/menu/menu_ss3.png"));
  menuSS.push(loadImage("./assets/menu/menu_ss4.png"));
  menuSS.push(loadImage("./assets/menu/menu_ss5.png"));
  menuSS.push(loadImage("./assets/menu/menu_ss6.png"));
  menuSS.push(loadImage("./assets/menu/menu_ss7.png"));
  menuSS.push(loadImage("./assets/menu/menu_sslocked.png"));
}

let startButton;
let discButton;
let backButton;

async function setup() {
  const response = await fetch("./dialogue.json");
  dialogueFile = await response.json();

  const c = createCanvas(800, 800);
  c.parent('sketch');

  rectMode(CENTER);
  textAlign(CENTER,CENTER);
  noSmooth();

  startButton = createButton("");
  startButton.position(50,560);
  startButton.size(700,72);
  startButton.style("opacity", "100");

  startButton.mousePressed(function() {
    startButton.hide();
    if (flag[0]) {
      s = 301;
    }
    else {
      flag[0] = true;
      s = 200;
    }
  });

  discButton = createButton("");
  discButton.position(50,640);
  discButton.size(700,72);
  discButton.style("opacity", "100");

  discButton.mousePressed(function() {
    s = 302;
    discButton.hide();
  });

  backButton = createButton("");
  backButton.position(50,720);
  backButton.size(700,72);
  backButton.style("opacity", "0");

  backButton.mousePressed(function() {
    s = 300;
    backButton.hide();
  });
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
      image(menuSS[0], 400 - menuSS[0].width, 100, menuSS[0].width*2, menuSS[0].height*2);

      if (flag[0]) {
        image(menuSS[2],200 - menuSS[2].width,600, menuSS[2].width*2, menuSS[2].height*2);
      }
      else {
        image(menuSS[1],50,560, menuSS[1].width*2, menuSS[1].height*2);
      }

      image(menuSS[4],50,640, menuSS[4].width*2, menuSS[4].height*2);
      startButton.show();
      discButton.show()
      break;
    case 301:
      background(0);

      image(menuSS[3],50,640, menuSS[3].width*2, menuSS[3].height*2);
      backButton.show();

      break;
    case 302:
      background(0);
      image(menuSS[5],0,-100,800,800);

      image(menuSS[3],50,640, menuSS[3].width*2, menuSS[3].height*2);
      backButton.show();

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

function keyPressed() {
  if (key === "z") {
    interact();
  }
  if ((keyCode === ESCAPE) && ((state == "I") || (state == "D"))) {
    changeState("P");
  }
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