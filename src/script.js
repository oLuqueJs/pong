// Game settings
const PADDLE_SPEED = 5
const AI_SPEED = 3
const INITIAL_BALL_SPEED = 4
const MAX_BALL_SPEED = 8
const MIN_BALL_SPEED = 3
const PADDLE_WIDTH = 10
const PADDLE_HEIGHT = 80
const BALL_SIZE = 14
const ANGLE_INFLUENCE = 0.15

// Game state
let ball = {
  x: 300,
  y: 300,
  dx: INITIAL_BALL_SPEED,
  dy: 0,
  speed: INITIAL_BALL_SPEED
}

let leftPaddle = {
  x: 30,
  y: 250
}

let rightPaddle = {
  x: 560,
  y: 250
}

let scores = {
  player: 0,
  ai: 0
}

function setup() {
  createCanvas(600, 600)
  textAlign(CENTER, CENTER)
  textSize(32)
}

function resetBall() {
  ball.x = width / 2
  ball.y = height / 2
  ball.speed = INITIAL_BALL_SPEED
  const angle = (Math.random() * Math.PI/4) - Math.PI/8 // Random angle between -22.5 and 22.5 degrees
  ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed * Math.cos(angle)
  ball.dy = ball.speed * Math.sin(angle)
}

function constrainBallSpeed() {
  const currentSpeed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy)
  if (currentSpeed > MAX_BALL_SPEED) {
    const scale = MAX_BALL_SPEED / currentSpeed
    ball.dx *= scale
    ball.dy *= scale
  } else if (currentSpeed < MIN_BALL_SPEED) {
    const scale = MIN_BALL_SPEED / currentSpeed
    ball.dx *= scale
    ball.dy *= scale
  }
  ball.speed = currentSpeed
}

function draw() {
  // Clear background
  background(0)
  
  // Draw scores
  fill(255)
  text(scores.player, width / 4, 50)
  text(scores.ai, 3 * width / 4, 50)
  
  // Draw ball
  circle(ball.x, ball.y, BALL_SIZE)
  
  // Ball movement and collision with top/bottom
  ball.x += ball.dx
  ball.y += ball.dy
  
  if (ball.y - BALL_SIZE/2 <= 0 || ball.y + BALL_SIZE/2 >= height) {
    ball.dy = -ball.dy
    constrainBallSpeed()
  }
  
  // Score points and reset ball
  if (ball.x + BALL_SIZE/2 >= width) {
    scores.player++
    resetBall()
  } else if (ball.x - BALL_SIZE/2 <= 0) {
    scores.ai++
    resetBall()
  }
  
  // Player paddle movement
  if (keyIsDown(87) && leftPaddle.y > 0) { // W key
    leftPaddle.y -= PADDLE_SPEED
  }
  if (keyIsDown(83) && leftPaddle.y < height - PADDLE_HEIGHT) { // S key
    leftPaddle.y += PADDLE_SPEED
  }
  
  // AI paddle movement
  const paddleCenter = rightPaddle.y + PADDLE_HEIGHT/2
  if (paddleCenter < ball.y) {
    rightPaddle.y = min(rightPaddle.y + AI_SPEED, height - PADDLE_HEIGHT)
  } else if (paddleCenter > ball.y) {
    rightPaddle.y = max(rightPaddle.y - AI_SPEED, 0)
  }
  
  // Draw paddles
  rect(leftPaddle.x, leftPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT)
  rect(rightPaddle.x, rightPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT)
  
  // Paddle collision detection
  if (ball.x - BALL_SIZE/2 <= leftPaddle.x + PADDLE_WIDTH && 
      ball.y >= leftPaddle.y && 
      ball.y <= leftPaddle.y + PADDLE_HEIGHT &&
      ball.dx < 0) {
    ball.dx = -ball.dx
    const relativeIntersectY = (leftPaddle.y + PADDLE_HEIGHT/2) - ball.y
    const normalizedIntersect = relativeIntersectY / (PADDLE_HEIGHT/2)
    const angle = normalizedIntersect * Math.PI/3 // Max 60 degree angle
    ball.dy = -ball.speed * Math.sin(angle)
    ball.dx = Math.abs(ball.speed * Math.cos(angle)) // Ensure it moves right
    constrainBallSpeed()
  }
  
  if (ball.x + BALL_SIZE/2 >= rightPaddle.x && 
      ball.y >= rightPaddle.y && 
      ball.y <= rightPaddle.y + PADDLE_HEIGHT &&
      ball.dx > 0) {
    ball.dx = -ball.dx
    const relativeIntersectY = (rightPaddle.y + PADDLE_HEIGHT/2) - ball.y
    const normalizedIntersect = relativeIntersectY / (PADDLE_HEIGHT/2)
    const angle = normalizedIntersect * Math.PI/3 // Max 60 degree angle
    ball.dy = -ball.speed * Math.sin(angle)
    ball.dx = -Math.abs(ball.speed * Math.cos(angle)) // Ensure it moves left
    constrainBallSpeed()
  }
}
