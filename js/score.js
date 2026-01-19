export class Score {
  constructor() {
    this.value = 0;
  }

  // Increase score over time
  update(delta) {
    this.value += delta * 0.01;
  }

  // Draw the score on the canvas
  render(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${Math.floor(this.value)}`, 10, 30);
  }

  // Reset score to 0 (used when starting a new game)
  reset() {
    this.value = 0;
  }
}
