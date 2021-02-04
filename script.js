/* eslint-disable max-classes-per-file */
// CLASSES
class Ball {
  constructor(argx, argy) {
    this.ballRadius = 10;
    this.color = '#0095DD';
    this.x = argx;
    this.y = argy;
    this.dx = 2;
    this.dy = -2;
  }
  // this method draws the ball

  drawBall(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  // this method changes the position of the ball on the canvas

  move(canvas) {
    // this is what moves the ball (literaly)
    if (this.x + this.dx > canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
      this.dx = -(this.dx);
    }
    if (this.y + this.dy > canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
      this.dy = -(this.dy);
    }
    this.x += this.dx;
    this.y += this.dy;
  }

  determineLoss(canvas, paddle) {
    // determine if ball goes off screen or not!
    if (this.y + this.dy > canvas.height - this.ballRadius) {
      if (this.x > paddle.x && this.x < paddle.x + paddle.width) {
        this.dy = -(this.dy);
      } else {
        alert('GAME OVER');
        document.location.reload();
      }
    }
  }
}
class Brick {
  constructor(argX, argY, argStatus) {
    this.x = argX;
    this.y = argY;
    this.status = argStatus;
    this.color = '#0095DD';
    this.width = 75;
    this.height = 20;
  }
  // methods here
  // THIS DRAWS THE BRICKS AND APPLYS OFFSETS

  drawBrick(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  detectCollision(ball) {
    // detect collision of ball during drawing!
    if (ball.x > this.x && ball.x < this.x + this.width
      && ball.y > this.y
      && ball.y < this.y + this.height) {
      ball.dy = -(ball.dy);
      this.status = 0;
    }
  }
}

class Paddle {
  constructor(canvas) {
    this.color = '#0095DD';
    this.width = 75;
    this.height = 10;
    this.x = (canvas.width - this.width) / 2;
  }

  drawPaddle(canvas, ctx, rightPressed, leftPressed) {
    if (this.x > (canvas.width - this.width)) {
      this.x = canvas.width - this.width;
    } else if (rightPressed) {
      this.x -= 7;
    }
    if (this.x < 0) {
      this.x = 0;
    } else if (leftPressed) {
      this.x += 7;
    }
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Lives {
  constructor(canvas) {
    this.lives = 3;
  }
}

// CONSTANTS
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// INITIALIZATIONS
const ball1 = new Ball(250, 300);
const ball2 = new Ball(200, 300);
const paddle = new Paddle(canvas);

// BRICK VALUES
const brickRowCount = 5;
const brickColumnCount = 3;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    // THIS CREATES THE BRICK'S AND THEIR POSITIONS
    const brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
    const brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
    bricks[c][r] = new Brick(brickX, brickY, 1);
  }
}

// EVENT HANDLERS AND EVENT LISTENERS
let rightPressed = false;
let leftPressed = false;

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

// this generates the canvas and draws all the class objects onto it
function renderObjectsOnCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // generate ball and move it
  ball1.drawBall(ctx);
  ball1.move(canvas);
  ball2.drawBall(ctx);
  ball2.move(canvas);

  // we need to draw each brick, every frame!
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        // draw brick if status == 1
        bricks[c][r].drawBrick(ctx);
        // detect collision of ball during drawing!
        bricks[c][r].detectCollision(ball1);
        bricks[c][r].detectCollision(ball2);
      }
    }
  }
  // update paddle position
  paddle.drawPaddle(canvas, ctx, leftPressed, rightPressed);
  // confirm loss state
  ball1.determineLoss(canvas, paddle);
  ball2.determineLoss(canvas, paddle);
}
setInterval(renderObjectsOnCanvas, 10);
