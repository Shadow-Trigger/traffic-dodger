export class Difficulty {
  constructor() {
    this.time = 0;
  }

  update(delta) {
    this.time += delta;
  }

  // Multiplier that slowly increases
  get speedMultiplier() {
    // return 1 + this.time / 30000; // ~every 30s
    
    let radians = this.time / 1000 * (Math.PI / 180);
    
    // Calculate sine
    let sineValue = Math.sin(radians);

    return Math.max(1, 1 + 10 * sineValue)
  }

  get spawnMultiplier() {
    return Math.max(0.4, 1 - this.time / 60000);
  }
}
