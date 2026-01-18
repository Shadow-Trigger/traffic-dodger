export class Player {
  constructor(lanes, canvasHeight) {
    this.lanes = lanes;

    // Sliding lane logic
    this.laneIndex = 2;
    this.x = this.lanes.getLaneX(this.laneIndex);
    this.targetX = this.x;
    this.moveSpeed = 0.6;

    // Player sprite size (scaled from 216x456)
    this.width = 50 * 0.75;
    this.height = 106 * 0.75;
    this.y = canvasHeight - this.height - 10; // small bottom margin

    // Load the sprite
    this.sprite = new Image();
    this.sprite.src = "assets/player.png";
    this.spriteLoaded = false;

    // Mark sprite as loaded
    this.sprite.onload = () => {
      this.spriteLoaded = true;
    };

    // Keyboard input for lane movement
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
    if (this.spriteLoaded) {
      ctx.drawImage(
        this.sprite,
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height
      );
    } else {
      // fallback green square
      ctx.fillStyle = "green";
      ctx.fillRect(
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height
      );
    }
  }

  // Optional: helper for collisions with enemies
  getBounds() {
    return {
      left: this.x - this.width / 2,
      right: this.x + this.width / 2,
      top: this.y - this.height / 2,
      bottom: this.y + this.height / 2,
    };
  }
}
