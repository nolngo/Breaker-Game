
class Ball {
  constructor(x, y, dx, dy) {
    this.radius = 10;
    this.color = 'red';
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move(canvas) {
    console.log(canvas);
    if (this.x + this.dx > canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
      this.dx = -(this.dx);
    }
    if (this.y + this.dy > canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
      this.dy = -(this.dy);
    }
    this.x += this.dx;
    this.y += this.dy;
  }
}
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ball1 = new Ball();
function renderObjectsOnCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball1.move(canvas);
  ball1.drawBall(ctx);
}
setInterval(renderObjectsOnCanvas, 10);

