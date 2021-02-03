class Paddle {
  constructor(canvas) {
    this.paddleHeight = 15;
    this.paddleWidth = 75;
    this.paddleX = (canvas.width - paddleWidth) / 2;
    this.paddleY = (canvas.height - this.paddleWidth);
    this.color = 'red';
  }
}

  drawPaddle(ctx, canvas); {
    ctx.beginPath();
    ctx.rect(this.paddleX, canvas.height - this.paddleHeight - 10, this.paddleWidth, this.paddleHeight);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();  
  }
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
