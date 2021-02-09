/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
eval("/* eslint-disable max-classes-per-file */\n// CLASSES\nclass Background {\n  constructor() {\n    this.color = 'black';\n  }\n\n  render(ctx, canvas) {\n    ctx.beginPath();\n    ctx.fillStyle = this.color;\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    ctx.closePath();\n  }\n}\n\nclass Ball {\n  constructor(argx, argy) {\n    this.ballRadius = 10;\n    this.color = 'red';\n    this.x = argx;\n    this.y = argy;\n    this.dx = 2;\n    this.dy = -2;\n  }\n  // this method draws the ball\n\n  drawBall(ctx) {\n    ctx.beginPath();\n    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n  // this method changes the position of the ball on the canvas\n\n  move(canvas) {\n    // this is what moves the ball (literaly)\n    if (this.x + this.dx > canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {\n      this.dx = -(this.dx);\n    }\n    if (this.y + this.dy > canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {\n      this.dy = -(this.dy);\n    }\n    this.x += this.dx;\n    this.y += this.dy;\n  }\n\n  determineLoss(canvas, paddle) {\n    // determine if ball goes off screen or not!\n    if (this.y + this.dy > canvas.height - this.ballRadius) {\n      if (this.x > paddle.x && this.x < paddle.x + paddle.width) {\n        this.dy = -(this.dy);\n      } else {\n        alert('GAME OVER');\n        document.location.reload();\n      }\n    }\n  }\n}\nclass Brick {\n  constructor(argX, argY, argStatus) {\n    this.x = argX;\n    this.y = argY;\n    this.status = argStatus;\n    this.color = '#0095DD';\n    this.width = 75;\n    this.height = 20;\n  }\n  // methods here\n  // THIS DRAWS THE BRICKS AND APPLYS OFFSETS\n\n  drawBrick(ctx) {\n    ctx.beginPath();\n    ctx.rect(this.x, this.y, this.width, this.height);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n\n  detectCollision(ball) {\n    // detect collision of ball during drawing!\n    if (ball.x > this.x && ball.x < this.x + this.width\n      && ball.y > this.y\n      && ball.y < this.y + this.height) {\n      ball.dy = -(ball.dy);\n      this.status = 0;\n    }\n  }\n}\n\nclass Paddle {\n  constructor(canvas) {\n    this.color = '#0095DD';\n    this.width = 75;\n    this.height = 10;\n    this.x = (canvas.width - this.width) / 2;\n  }\n\n  drawPaddle(canvas, ctx, rightPressed, leftPressed) {\n    if (this.x > (canvas.width - this.width)) {\n      this.x = canvas.width - this.width;\n    } else if (rightPressed) {\n      this.x -= 7;\n    }\n    if (this.x < 0) {\n      this.x = 0;\n    } else if (leftPressed) {\n      this.x += 7;\n    }\n    ctx.beginPath();\n    ctx.rect(this.x, canvas.height - this.height, this.width, this.height);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\nclass Lives {\n  constructor() {\n    this.lives = 3;\n  }\n\n  drawLives(ctx, canvas) {\n    ctx.font = '16px Arial';\n    ctx.fillstyle = 'red';\n    ctx.fillText(`Lives: ${this.lives}`, canvas.width - 65, 20);\n  }\n}\n\nclass Score {\n  constructor() {\n    this.score = 0;\n  }\n\n  drawScore(ctx) {\n    ctx.font = '16px Arial';\n    ctx.fillstyle = 'red';\n    ctx.fillText(`Score: ${this.score}`, 20, 20);\n  }\n}\n\n// CONSTANTS\nconst canvas = document.getElementById('myCanvas');\nconst ctx = canvas.getContext('2d');\n\n// INITIALIZATIONS\nconst background = new Background();\nconst ball1 = new Ball(250, 300);\nconst ball2 = new Ball(200, 300);\nconst paddle = new Paddle(canvas);\nconst lives = new Lives();\nconst score = new Score();\n\n// BRICK VALUES\nconst brickRowCount = 5;\nconst brickColumnCount = 3;\nconst brickWidth = 75;\nconst brickHeight = 20;\nconst brickPadding = 10;\nconst brickOffsetTop = 30;\nconst brickOffsetLeft = 30;\nconst bricks = [];\nfor (let c = 0; c < brickColumnCount; c += 1) {\n  bricks[c] = [];\n  for (let r = 0; r < brickRowCount; r += 1) {\n    // THIS CREATES THE BRICK'S AND THEIR POSITIONS\n    const brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;\n    const brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;\n    bricks[c][r] = new Brick(brickX, brickY, 1);\n  }\n}\n\n// EVENT HANDLERS AND EVENT LISTENERS\nlet rightPressed = false;\nlet leftPressed = false;\n\nfunction keyDownHandler(e) {\n  if (e.key === 'Right' || e.key === 'ArrowRight') {\n    rightPressed = true;\n  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {\n    leftPressed = true;\n  }\n}\n\nfunction keyUpHandler(e) {\n  if (e.key === 'Right' || e.key === 'ArrowRight') {\n    rightPressed = false;\n  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {\n    leftPressed = false;\n  }\n}\n\ndocument.addEventListener('keydown', keyDownHandler, false);\ndocument.addEventListener('keyup', keyUpHandler, false);\n\n// this generates the canvas and draws all the class objects onto it\nfunction renderObjectsOnCanvas() {\n  background.render(ctx, canvas);\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  // generate ball and move it\n  ball1.drawBall(ctx);\n  ball1.move(canvas);\n  ball2.drawBall(ctx);\n  ball2.move(canvas);\n\n  // we need to draw each brick, every frame!\n  for (let c = 0; c < brickColumnCount; c += 1) {\n    for (let r = 0; r < brickRowCount; r += 1) {\n      if (bricks[c][r].status === 1) {\n        // draw brick if status == 1\n        bricks[c][r].drawBrick(ctx);\n        // detect collision of ball during drawing!\n        bricks[c][r].detectCollision(ball1);\n        bricks[c][r].detectCollision(ball2);\n      }\n    }\n  }\n\n  score.drawScore(ctx);\n  lives.drawLives(ctx, canvas);\n  // update paddle position\n  paddle.drawPaddle(canvas, ctx, leftPressed, rightPressed);\n  // confirm loss state\n  ball1.determineLoss(canvas, paddle);\n  ball2.determineLoss(canvas, paddle);\n}\nsetInterval(renderObjectsOnCanvas, 10);\n\n\n//# sourceURL=webpack://Breaker-Game/./src/script.js?");
/******/ })()
;