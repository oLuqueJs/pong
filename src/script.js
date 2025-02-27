let CIR_X = 300
let CIR_Y = 300
let CIR_D = 14

let RECT_X_LEFT = 30
let RECT_Y_LEFT = 250
let RECT_W = 10
let RECT_H = 80

let RECT_X_RIGHT = 560
let RECT_Y_RIGHT = 250

let CIR_AXIS_X = 3
let CIR_AXIS_Y = 3

function setup() {
  createCanvas(600, 600)
  background(0)
}

function draw() {
  background(0)
  circle(CIR_X, CIR_Y, CIR_D)

  let CIR_R = CIR_X + CIR_D / 2;

  if (CIR_R >= width || CIR_X - CIR_D / 2 <= 0) {
    CIR_AXIS_X = -CIR_AXIS_X;
  }

  if (CIR_Y - CIR_D / 2 <= 0 || CIR_Y + CIR_D / 2 >= height) {
    CIR_AXIS_Y = -CIR_AXIS_Y;
  }

  CIR_X += CIR_AXIS_X;
  CIR_Y += CIR_AXIS_Y;

  if (keyIsDown(87) && RECT_Y_LEFT > 0) { 
    RECT_Y_LEFT -= 5;
  }

  if (keyIsDown(83) && RECT_Y_LEFT < height - RECT_H) { 
    RECT_Y_LEFT += 5;
  }

  if (RECT_Y_RIGHT + RECT_H / 2 < CIR_Y) {
    RECT_Y_RIGHT += 3;
  } else if (RECT_Y_RIGHT + RECT_H / 2 > CIR_Y) {
    RECT_Y_RIGHT -= 3;
  }

  rect(RECT_X_LEFT, RECT_Y_LEFT, RECT_W, RECT_H);
  rect(RECT_X_RIGHT, RECT_Y_RIGHT, RECT_W, RECT_H);

  if (CIR_X - CIR_D / 2 <= RECT_X_LEFT + RECT_W && CIR_Y > RECT_Y_LEFT && CIR_Y < RECT_Y_LEFT + RECT_H) {
    CIR_AXIS_X = -CIR_AXIS_X;
  }

  if (CIR_X + CIR_D / 2 >= RECT_X_RIGHT && CIR_Y > RECT_Y_RIGHT && CIR_Y < RECT_Y_RIGHT + RECT_H) {
    CIR_AXIS_X = -CIR_AXIS_X;
  }
}
