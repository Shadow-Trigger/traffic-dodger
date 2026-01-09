export class Score {
  constructor() {
    this.value = 0;
  }

  update(delta) {
    this.value += delta * 0.01; // score over time
  }

  render(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(
      `Score: ${Math.floor(this.value)}`,
      10,
      30
    );
  }
}
