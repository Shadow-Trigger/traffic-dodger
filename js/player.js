export class Player {
  constructor(lanes, canvasHeight) {
    this.lanes = lanes;

    this.laneIndex = 2;
    this.x = this.lanes.getLaneX(this.laneIndex);
    this.targetX = this.x;

    this.moveSpeed = 0.6;

    // scaled size for the PNG
    this.width = 50;   // scaled from 216
    this.height = 106; // scaled from 456
    this.y = canvasHeight - this.height - 10; // leave a bit of bottom margin

    // load the player sprite
    this.sprite = new Image();
    this.sprite.src = "assets/player.png"; // put your PNG in assets/

    // keyboard input
    window.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft" && this.laneIndex > 0) {
        this.laneIndex--;
        this.targetX = this.lanes.getLaneX(this.laneIndex);
      }
      if (e.key === "ArrowRight" && this.laneIndex < this.lanes.count - 1) {
        this.laneIndex++;
        this.targetX = this.lanes.getLaneX(this.laneIndex);
      }
    });
  }

  update() {
    const dx = this.targetX - this.x;
    this.x += dx * this.moveSpeed;

    // snap when very close (prevents jitter)
    if (Math.abs(dx) < 0.1) {
      this.x = this.targetX;
    }
  }

  render(ctx) {
    if (this.sprite.complete) {
      ctx.drawImage(
        this.sprite,
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height
      );
    } else {
      // fallback green rectangle if sprite hasn't loaded yet
      ctx.fillStyle = "green";
      ctx.fillRect(
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height
      );
    }
  }
}

