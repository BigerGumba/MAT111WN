let scale = 1.0;
let c;

let flag = [true, 
            false, false, false, false, false,
            false, false, false, false
];
/*
  FLAGS GUIDE
  0 = Started new game?
  1 = Reached Scene 2?
  2 = Reached Scene 3?
  3 = Reached Scene 4?
  4 = Reached Scene 5?
  5 = Reached Scene 6?
  6 = Reached Scene 9?
  7 = Initiated?
  8 = Paused?
  9 = In Save Animation?
*/
let defaultFlags = [false,
                    false, false, false, false, false,
                    false, false, false, false
];

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
  1 = Virtual Bedroom
  2 = Virtual Living Room
  3 = Balcony Warp Zone
  20 = Work Hub
  21 = Side Office
  30 = First Layer
  40 = Second Layer
  50 = Third Layer / Chase
  60 = Real Home Blackout
  61 = Hallway
  62 = Elevator Room
  63 = Boss Room
  100 = Ending 0
  101 = Ending 1
  102 = Ending 2
  103 = Ending 3
  104 = Ending 4
  200 = Intro Cutscene
  300 = Title Screen
  301 = Scene Select Screen
  302 = Disclaimer Screen
  303 = Credits Screen
  999 = Pre-Initiation
*/

let dialogueFile;
let currDialogueBox;

class dialogueBox {
  constructor(tID) {
    this.tID = tID;
    this.storedState = state;
    state = "D";

    this.c = 0;
    this.s = 0;
    this.timer = 0;
    this.defaultTime = 20;
    this.line = "";
    this.running = true;
    let block;

    switch (this.tID) {
      case 0:
        block = dialogueFile.introductoryCutscene;
    }

    this.lineList = block.text;
    this.speakerList = block.speaker;
  }
  display(delta) {
    stroke(255); 
    fill(0);
    textSize(32 * scale);
    if (this.speakerList.length > 0) {
      circle(scale * 60,scale * 560,scale * 40); 
      circle(scale * 240,scale * 560,scale * 40); 

      noStroke(); 
      rect(scale * 60,scale * 540,scale * 180,scale * 80); 
      rect(scale * 40,scale * 560,scale * 220,scale * 80);

      stroke(255); 
      line(scale * 60,scale * 540,scale * 240,scale * 540); 
      line(scale * 260,scale * 560,scale * 260,scale * 600); 
      line(scale * 40,scale * 560,scale * 40,scale * 640);

      text(this.speakerList[this.s],scale * 150,scale * 580);
    }
    
    circle(scale * 80, scale * 640, scale * 80); 
    circle(scale * 80, scale * 720, scale * 80); 
    circle(scale * 720, scale * 640, scale * 80); 
    circle(scale * 720, scale * 720, scale * 80); 
    
    noStroke(); 
    rect(scale * 80,scale * 600,scale * 640,scale * 160); 
    rect(scale * 40,scale * 640,scale * 720,scale * 80); 
    
    stroke(255); 
    line(scale * 40,scale * 640,scale * 40,scale * 720); 
    line(scale * 80,scale * 600,scale * 720,scale * 600); 
    line(scale * 720,scale * 760,scale * 80,scale * 760); 
    line(scale * 760,scale * 640,scale * 760,scale * 720);

    fill(255);
    text(this.line,scale * 100,scale * 640,scale * 600,scale * 80);

    if (!this.running) {
      return;
    }
    let next = this.lineList[this.c];

    if (this.timer > 0) {
      this.timer -= delta;
      return;
    }

    this.timer = this.defaultTime;

    if (next == undefined) {
      state = this.storedState;
      currDialogueBox = null;
      return;
    }

    if (next == " ") {
      this.c++;
      this.line += next;
      return;
    }
    if (next == "/") {
      this.c++;
      switch (this.lineList[this.c]) {
        case "p":
          this.timer = 200;
          break;
        case "l":
          this.timer = 500;
          break;
        case "s":
          this.s++;
          break;
        case "e":
          this.running = false;
          break;
        case "c":
          this.line = "";
          break;
        case "/":
          this.line += "/";
          break;
        case "!":
          this.c++;
          let eventCode =
            this.lineList[this.c] +
            this.lineList[this.c + 1];
          
          switch (eventCode) {
            case "00":
              changeScene(0);
              break;
          }
          this.c++;
          break;
      }
    }
    else {
      this.line += this.lineList[this.c];
    }
    this.c++;
  }
  advance() {
    if(!this.running) {
      this.line = "";
      this.running = true;
    }
  }
}

let buttons = [];

class betterButton {
  constructor(id, bsx, bsy, blx, bly) {
    this.id = id;
    this.bsx = bsx;
    this.bsy = bsy;
    this.blx = blx;
    this.bly = bly;
    this.sx = bsx;
    this.sy = bsy;
    this.lx = blx;
    this.ly = bly;
  }
  onClick(mouseX, mouseY) {
    if ((mouseX > this.sx) && (mouseX < (this.sx + this.lx)) && (mouseY > this.sy) && (mouseY < (this.sy + this.ly))) {
      switch (this.id) {
        case 0:
          if (flag[0]) {
            changeScene(301);
          }
          else {
            flag[0] = true;
            changeScene(200);
          }
          break;
        case 1:
          changeScene(302);
          break;
        case 2:
          changeScene(303);
          break;
        case 3:
          changeScene(300);
          break;
        case 10:
          if (flag[0]) {
            changeScene(0);
          }
          break;
        case 11:
          if (flag[1]) {
            changeScene(20);
          }
          break;
        case 12:
          if (flag[2]) {
            changeScene(30);
          }
          break;
        case 13:
          if (flag[3]) {
            changeScene(40);
          }
          break;
        case 14:
          if (flag[4]) {
            changeScene(50);
          }
          break;
        case 15:
          if (flag[5]) {
            changeScene(60);
          }
          break;
        case 16:
          if (flag[6]) {
            changeScene(63);
          }
          break;
      }
    }
  }
  resize() {
    this.sx = this.bsx * scale;
    this.sy = this.bsy * scale;
    this.lx = this.blx * scale;
    this.ly = this.bly * scale;
  }
}

class screenOverlay {
  constructor(cstart,cend,millis) {
    this.cstart = cstart;
    this.cend = cend;
    this.timeLeft = millis;
    this.duration = millis;
  }
  display(delta) {
    if (this.timeLeft > 0) {
      fill(lerpColor(this.cend, this.cstart, this.timeLeft/this.duration));
      rect(-100,-100,1000,1000);
      this.timeLeft -= delta;
    }
  }
}

let currPlayer;

class player {
  constructor(isReal,dir) {
    this.isReal = isReal;
    this.dir = dir;
    this.s = 0;
    this.t = 0;
  }
  display(isMoving, delta) {
    if (isMoving) {
      this.t += delta;
      if (this.t > 200) {
        this.t = 0;
        this.s++;
        if (this.s > 3) {
          this.s = 0;
        }
      }
    }
    else {
      this.t = 200;
    }
    switch (this.dir) {
      // FACING LEFT
      case 0:
        switch (this.s) {
          case 0:
            if (this.isReal) {
              image(charSSReal,scale*368,scale*336,64*scale,128*scale,0,0,16,32);
            }
            else {

            }
            break;
          case 1:
            if (this.isReal) {
              image(charSSReal,scale*368,scale*336,64*scale,128*scale,16,0,16,32);
            }
            else {

            }
            break;
          case 2:
            if (this.isReal) {
              image(charSSReal,scale*368,scale*336,64*scale,128*scale,0,0,16,32);
            }
            else {

            }
            break;
          case 3:
            if (this.isReal) {
              image(charSSReal,scale*368,scale*336,64*scale,128*scale,32,0,16,32);
            }
            else {

            }
            break;
        }
        break;
      // FACING RIGHT
      case 1:
        switch (this.s) {
          case 0:
            if (this.isReal) {
              image(charSSReal,scale*368,scale*336,64*scale,128*scale,48,0,16,32);
            }
            else {

            }
            break;
          case 1:
            if (this.isReal) {
              image(charSSReal,scale*368,scale*336,64*scale,128*scale,64,0,16,32);
            }
            else {

            }
            break;
          case 2:
            if (this.isReal) {
              image(charSSReal,scale*368,scale*336,64*scale,128*scale,48,0,16,32);
            }
            else {

            }
            break;
          case 3:
            if (this.isReal) {
              image(charSSReal,scale*368,scale*336,64*scale,128*scale,80,0,16,32);
            }
            else {

            }
            break;
        }
        break;
      // FACING UP
      case 2:
        switch (this.s) {
          case 0:
            if (this.isReal) {
              image(charSSReal,scale*368,scale*336,64*scale,128*scale,144,0,16,32);
            }
            else {

            }
            break;
          case 1:
            if (this.isReal) {
              image(charSSReal,scale*368,scale*336,64*scale,128*scale,160,0,16,32);
            }
            else {

            }
            break;
          case 2:
            if (this.isReal) {
              image(charSSReal,scale*368,scale*336,64*scale,128*scale,144,0,16,32);
            }
            else {

            }
            break;
          case 3:
            if (this.isReal) {
              image(charSSReal,scale*368,scale*336,64*scale,128*scale,176,0,16,32);
            }
            else {

            }
            break;
        }
        break;
      // FACING DOWN
      case 3:
        switch (this.s) {
          case 0:
            if (this.isReal) {
              image(charSSReal,scale*368,scale*336,64*scale,128*scale,96,0,16,32);
            }
            else {

            }
            break;
          case 1:
            if (this.isReal) {
              image(charSSReal,scale*368,scale*336,64*scale,128*scale,112,0,16,32);
            }
            else {

            }
            break;
          case 2:
            if (this.isReal) {
              image(charSSReal,scale*368,scale*336,64*scale,128*scale,96,0,16,32);
            }
            else {

            }
            break;
          case 3:
            if (this.isReal) {
              image(charSSReal,scale*368,scale*336,64*scale,128*scale,128,0,16,32);
            }
            else {

            }
            break;
        }
        break;
    }
  }
}

let menuSS = [];

let charSSReal;

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
  menuSS.push(loadImage("./assets/menu/menu_credits.png"));
  menuSS.push(loadImage("./assets/menu/menu_sceneselect_off.png"));
  menuSS.push(loadImage("./assets/menu/menu_ss1.png"));
  menuSS.push(loadImage("./assets/menu/menu_ss2.png"));
  menuSS.push(loadImage("./assets/menu/menu_ss3.png"));
  menuSS.push(loadImage("./assets/menu/menu_ss4.png"));
  menuSS.push(loadImage("./assets/menu/menu_ss5.png"));
  menuSS.push(loadImage("./assets/menu/menu_ss6.png"));
  menuSS.push(loadImage("./assets/menu/menu_ss7.png"));
  menuSS.push(loadImage("./assets/menu/menu_sslocked.png"));
  charSSReal = loadImage("./assets/protagss/protagspritesheet.png");
}

let playButton;

function toggle() {
  if (flag[7]) {
    if (flag[8]) {
      if (flag[9]) {
        document.getElementById("play_button").textContent = "Game has been saved.";
      }
      else {
        document.getElementById("play_button").textContent = "Save?";
      }
    }
    else {
      document.getElementById("play_button").textContent = "Game in progress...";
    }
  }
  else {
    flag[7] = true;
    changeScene(300);
    document.getElementById("play_button").textContent = "Game in progress...";
  }
}

async function setup() {
  const response = await fetch("./dialogue.json");
  dialogueFile = await response.json();

  playButton = document.getElementById("play_button");
  playButton.addEventListener("click", toggle);

  c = createCanvas(scale * 800, scale * 800);
  c.parent('sketch');

  textAlign(CENTER,CENTER);

  noSmooth();
}

function changeScene(newId) {
  buttons = [];
  currPlayer = null;

  switch (newId) {
    case 0:
      currPlayer = new player(true, 3);
      changeState("I");
      break;
    case 200:
      currDialogueBox = new dialogueBox(0);
      break;
    case 300:
      buttons.push(new betterButton(0, 80, 480, 700, 72));
      buttons.push(new betterButton(1, 80, 560, 700, 72));
      buttons.push(new betterButton(2, 80, 640, 700, 72));
      break;
    case 301:
      buttons.push(new betterButton(10, 80, 80, 700, 72));
      buttons.push(new betterButton(11, 80, 160, 700, 72));
      buttons.push(new betterButton(12, 80, 240, 700, 72));
      buttons.push(new betterButton(13, 80, 320, 700, 72));
      buttons.push(new betterButton(14, 80, 400, 700, 72));
      buttons.push(new betterButton(15, 80, 480, 700, 72));
      buttons.push(new betterButton(16, 80, 560, 700, 72));
      break;
    case 302:
      buttons.push(new betterButton(3, 80, 640, 700, 72));
      break;
    case 303:
      buttons.push(new betterButton(3, 80, 640, 700, 72));
      break;
  }

  s = newId;
}

function draw() {
  resize();

  if (buttons.length > 0) {
    for (let button of buttons) {
      button.resize();
    }
  }

  switch (s) {
    case 0:
      s0();
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
      background(0);
      break;
    case 300:
      s300();
      break;
    case 301:
      s301();
      break;
    case 302:
      s302();
      break;
    case 303:
      s303();
      break;
    case 999:
      background(0);
      return;
  }

  if (currDialogueBox) {
    currDialogueBox.display(deltaTime);
  }

    if (currPlayer) {
      let isMoving = false;
      if (state == "I") {
        if (keyIsDown(UP_ARROW)){
          currPlayer.dir = 2;
          y+= -0.2 * deltaTime;
          isMoving = true;
        }
        if (keyIsDown(DOWN_ARROW)) {
          currPlayer.dir = 3;
          y+= 0.2 * deltaTime;
          isMoving = true;
        }
        if (keyIsDown(RIGHT_ARROW)) {
          currPlayer.dir = 1;
          x+= 0.2 * deltaTime;
          isMoving = true;
        }
        if (keyIsDown(LEFT_ARROW)) {
          currPlayer.dir = 0;
          x+= -0.2 * deltaTime;
          isMoving = true;
        }
      }
      currPlayer.display(isMoving, deltaTime);
  }
}

function resize() {
  scale = min(windowWidth, windowHeight) / 1200;
  resizeCanvas(800 * scale, 800 * scale);
}

function s0() {
  background(0);
}

function s300() {
  background(0);
  image(menuSS[0], scale * (400 - menuSS[0].width), scale * 100, scale * menuSS[0].width * 2, scale * menuSS[0].height * 2);

  if (flag[0]) {
    image(menuSS[2],scale * 80,scale * 480, scale * menuSS[2].width * 2, scale * menuSS[2].height * 2);
  }
  else {
    image(menuSS[1],scale * 80,scale * 480, scale * menuSS[1].width * 2, scale * menuSS[1].height * 2);
  }

  image(menuSS[4],scale * 80,scale * 560, scale * menuSS[4].width*2, scale * menuSS[4].height*2);
  image(menuSS[6],scale * 80,scale * 640, scale * menuSS[6].width*2, scale * menuSS[6].height*2);
}

function s301() {
  background(0);
  if (flag[0]) {
    image(menuSS[8],scale * 80,scale * 80, scale * menuSS[8].width * 2, scale * menuSS[8].height * 2);
  }
  else {
    image(menuSS[15],scale * 80,scale * 80, scale * menuSS[15].width * 2, scale * menuSS[15].height * 2);
  }
  if (flag[1]) {
    image(menuSS[9],scale * 80,scale * 160, scale * menuSS[9].width * 2, scale * menuSS[9].height * 2);
  }
  else {
    image(menuSS[15],scale * 80,scale * 160, scale * menuSS[15].width * 2, scale * menuSS[15].height * 2);
  }
  if (flag[2]) {
    image(menuSS[10],scale * 80,scale * 240, scale * menuSS[10].width * 2, scale * menuSS[10].height * 2);
  }
  else {
    image(menuSS[15],scale * 80,scale * 240, scale * menuSS[15].width * 2, scale * menuSS[15].height * 2);
  }
  if (flag[3]) {
    image(menuSS[11],scale * 80,scale * 320, scale * menuSS[11].width * 2, scale * menuSS[11].height * 2);
  }
  else {
    image(menuSS[15],scale * 80,scale * 320, scale * menuSS[15].width * 2, scale * menuSS[15].height * 2);
  }
  if (flag[4]) {
    image(menuSS[12],scale * 80,scale * 400, scale * menuSS[12].width * 2, scale * menuSS[12].height * 2);
  }
  else {
    image(menuSS[15],scale * 80,scale * 400, scale * menuSS[15].width * 2, scale * menuSS[15].height * 2);
  }
  if (flag[5]) {
    image(menuSS[13],scale * 80,scale * 480, scale * menuSS[13].width * 2, scale * menuSS[13].height * 2);
  }
  else {
    image(menuSS[15],scale * 80,scale * 480, scale * menuSS[15].width * 2, scale * menuSS[15].height * 2);
  }
  if (flag[6]) {
    image(menuSS[14],scale * 80,scale * 560, scale * menuSS[14].width * 2, scale * menuSS[14].height * 2);
  }
  else {
    image(menuSS[15],scale * 80,scale * 560, scale * menuSS[15].width * 2, scale * menuSS[15].height * 2);
  }
  image(menuSS[3],scale * 80,scale * 640, scale * menuSS[3].width * 2, scale * menuSS[3].height * 2);
}

function s302() {
  background(0);
  image(menuSS[5],0,scale * -100,scale * 800,scale * 800);
  image(menuSS[3],scale * 80,scale * 640, scale * menuSS[3].width * 2, scale * menuSS[3].height * 2);
}

function s303() {
  background(0);
  image(menuSS[3],scale * 80,scale * 640, scale * menuSS[3].width * 2, scale * menuSS[3].height * 2);
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
    switch (state) {
      case "D":
        currDialogueBox.advance();
        break;
    }
  }
  if ((keyCode === ESCAPE) && ((state == "I") || (state == "D"))) {
    changeState("P");
  }
}

function mousePressed() {
  for (let button of buttons) {
    button.onClick(mouseX, mouseY);
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