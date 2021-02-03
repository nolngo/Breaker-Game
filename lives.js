class Lives {
  constructor(x, y, lives, color) {
    this.x = x;
    this.y = y;
    this.lives = lives;
    this.color = color;
  }
  render(ctx) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(`Lives: ${this.lives}`, canvas.width - 65, 20);  
  }
}