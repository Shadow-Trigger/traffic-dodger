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
  return !(
    this.x + this.size/2 < player.x - player.width/2 ||
    this.x - this.size/2 > player.x + player.width/2 ||
    this.y + this.size/2 < player.y - player.height/2 ||
    this.y - this.size/2 > player.y + player.height/2
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
