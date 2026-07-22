let scale = 1.0;
let c;
let origin;

let flag = [false, 
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
    this.skip = false;
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
    if (this.speakerList.length > 0) {
      circle(60,560,40); 
      circle(240,560,40); 

      noStroke(); 
      rect(150,580,180,80); 
      rect(150,600,220,80);

      stroke(255); 
      line(60,540,240,540); 
      line(260,560,260,600); 
      line(40,560,40,640);

      text(this.speakerList[this.s],150,580);
    }
    
    circle(80, 640, 80); 
    circle(80, 720, 80); 
    circle(720, 640, 80); 
    circle(720, 720, 80); 
    
    noStroke(); 
    rect(400,680,640,160); 
    rect(400,680,720,80); 
    
    stroke(255); 
    line(40,640,40,720); 
    line(80,600,720,600); 
    line(720,760,80,760); 
    line(760,640,760,720);

    fill(255);
    text(this.line,400,680,600,80);

    if (!this.running) {
      return;
    }
    if (this.timer > 0) {
      this.timer -= delta;
      return;
    }
    let next = this.lineList[this.c];
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
        case "r":
          this.defaultTime = -1;
          break;
        case "n":
          this.defaultTime = 20;
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
          let eventCode = next + this.lineList(this.c);
          break;
          
          switch (eventCode) {
            case "00":
              changeScene(0);
              break;
          }
      }
    }
    else {
      this.line += this.lineList[this.c];
    }
    this.c++;
  }
  advance() {
    if(this.running) {
      this.skip = true;
    }
    else {
      this.line = "";
      this.running = true;
      this.skip = false;
    }
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
}

let startButton;
let discButton;
let backButton;
let credButton;
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
  origin = c.position();

  rectMode(CENTER);
  textAlign(CENTER,CENTER);
  textSize(32);

  noSmooth();

  startButton = createButton("");
  startButton.position((scale * 80) + origin.x,(scale * 480) + origin.y);
  startButton.size(scale * 700,scale * 72);
  startButton.style("opacity", "100");

  startButton.mousePressed(function() {
    if (flag[0]) {
      changeScene(301);
    }
    else {
      flag[0] = true;
      changeScene(200);
    }
  });
  startButton.attribute('disabled', '');

  discButton = createButton("");
  discButton.position((scale * 80) + origin.x,(scale * 560) + origin.y);
  discButton.size(scale * 700,scale * 72);
  discButton.style("opacity", "100");

  discButton.mousePressed(function() {
    changeScene(302);
  });
  discButton.attribute('disabled', '');

  backButton = createButton("");
  backButton.position((scale * 80) + origin.x,(scale * 640) + origin.y);
  backButton.size(scale * 700,scale * 72);
  backButton.style("opacity", "100");

  backButton.mousePressed(function() {
   changeScene(300);
  });
  backButton.attribute('disabled', '');

  credButton = createButton("");
  credButton.position((scale * 80) + origin.x,(scale * 640) + origin.y);
  credButton.size(scale * 700, scale * 72);
  credButton.style("opacity","100");

  credButton.mousePressed(function() {
    changeScene(303);
  });
  credButton.attribute('disabled', '');
}

function changeScene(newId) {
  startButton.style("z-index", "-50");
  discButton.style("z-index", "-50");
  credButton.style("z-index", "-50");
  backButton.style("z-index", "-50");
  startButton.attribute('disabled', '');
  discButton.attribute('disabled', '');
  credButton.attribute('disabled', '');
  backButton.attribute('disabled', '');

  switch (newId) {
    case 0:
      s300();
      break;
    case 200:
      currDialogueBox = new dialogueBox(0);
      break;
    case 300:
      startButton.style("z-index", "1");
      discButton.style("z-index", "1");
      credButton.style("z-index", "1");
      startButton.removeAttribute('disabled');
      discButton.removeAttribute('disabled');
      credButton.removeAttribute('disabled');
      break;
    case 301:
      backButton.style("z-index", "1");
      backButton.removeAttribute('disabled');
      break;
    case 302:
      backButton.style("z-index", "1");
      backButton.removeAttribute('disabled');
      break;
    case 303:
      backButton.style("z-index", "1");
      backButton.removeAttribute('disabled');
      break;
  }

  s = newId;
}

function draw() {
  resize();
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

function resize() {
  scale = min(windowWidth, windowHeight) / 1200;
  resizeCanvas(800 * scale, 800 * scale);
  origin = c.position();
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

  image(menuSS[4],0,scale * 560, scale * menuSS[4].width*2, scale * menuSS[4].height*2);
  image(menuSS[6],scale * 80,scale * 640, scale * menuSS[6].width*2, scale * menuSS[6].height*2);
}

function s301() {
  background(0);
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