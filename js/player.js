export class Player {
  constructor(lanes, canvasHeight) {
    this.lanes = lanes;
    this.laneIndex = 2;
    this.x = this.lanes.getLaneX(this.laneIndex);
    this.targetX = this.x;
    this.moveSpeed = 0.6; // tweak this for difficulty
    this.size = 40;
    this.y = canvasHeight - 80;

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
}

  render(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
  }
}

