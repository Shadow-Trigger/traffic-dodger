export class Enemy {
  constructor(x, speed, startY = -50) {
    this.x = x;
    this.y = startY;   // starting Y position configurable
    this.size = 40;
    this.speed = speed;
  }

  update(delta) {
    this.y += this.speed * delta;
  }

  offScreen(height) {
    return this.y > height + 50;
  }

  collidesWith(player) {
    return (
      Math.abs(this.x - player.x) < this.size &&
      Math.abs(this.y - player.y) < this.size
    );
  }

  render(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
  }
}
