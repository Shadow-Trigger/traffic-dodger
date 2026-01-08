export class Player {
  constructor(lanes, canvasHeight) {
    this.lanes = lanes;
    this.laneIndex = 2;
    this.size = 40;
    this.y = canvasHeight - 80;

    window.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft" && this.laneIndex > 0) {
        this.laneIndex--;
      }
      if (e.key === "ArrowRight" && this.laneIndex < lanes.count - 1) {
        this.laneIndex++;
      }
    });
  }

  get x() {
    return this.lanes.getLaneX(this.laneIndex);
  }

  update() {}

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

