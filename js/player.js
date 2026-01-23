export class Player {
  constructor(lanes, canvasHeight, skinPath) {
    this.lanes = lanes;

    // Lane logic
    this.laneIndex = Math.floor(lanes.count / 2);
    this.x = this.lanes.getLaneX(this.laneIndex);
    this.targetX = this.x;
    this.moveSpeed = 0.6;

    // Sprite size
    this.width = 50 * 0.75;
    this.height = 106 * 0.75;
    this.y = canvasHeight - this.height - 10;

    // Load sprite
    this.sprite = new Image();
    this.sprite.src = skinPath || "assets/player.png";
    this.spriteLoaded = false;
    this.sprite.onload = () => {
      this.spriteLoaded = true;
    };

    // Bind keyboard once
    this.handleKeyDown = this.handleKeyDown.bind(this);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  /* -----------------------------
     INPUT
  ----------------------------- */

  handleKeyDown(e) {
    if (e.key === "ArrowLeft") {
      this.moveLeft();
    }

    if (e.key === "ArrowRight") {
      this.moveRight();
    }
  }

  moveLeft() {
    if (this.laneIndex > 0) {
      this.laneIndex--;
      this.targetX = this.lanes.getLaneX(this.laneIndex);
    }
  }

  moveRight() {
    if (this.laneIndex < this.lanes.count - 1) {
      this.laneIndex++;
      this.targetX = this.lanes.getLaneX(this.laneIndex);
    }
  }

  /* -----------------------------
     UPDATE / RENDER
  ----------------------------- */

  update() {
    const dx = this.targetX - this.x;
    this.x += dx * this.moveSpeed;

    // Snap to avoid jitter
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
      ctx.fillStyle = "green";
      ctx.fillRect(
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height
      );
    }
  }

  /* -----------------------------
     COLLISION
  ----------------------------- */

  getBounds() {
    return {
      left: this.x - this.width / 2,
      right: this.x + this.width / 2,
      top: this.y - this.height / 2,
      bottom: this.y + this.height / 2,
    };
  }

  /* -----------------------------
     CLEANUP (optional but good)
  ----------------------------- */

  destroy() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }
}
