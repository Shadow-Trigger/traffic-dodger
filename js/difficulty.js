export class Difficulty {
  constructor() {
    this.time = 0;
  }

  update(delta) {
    this.time += delta;
  }

  // Multiplier that slowly increases
  get speedMultiplier() {
    return 1 + this.time / 30000; // ~every 30s
  }

  get spawnMultiplier() {
    return Math.max(0.4, 1 - this.time / 60000);
  }
}
