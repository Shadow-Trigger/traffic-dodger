import { Enemy } from "./enemy.js";

export class Spawner {
  constructor(lanes, difficulty) {
    this.lanes = lanes;
    this.difficulty = difficulty;
    this.timer = 0;
    this.baseSpawnRate = 1000;
  }

  update(delta, enemies, score) {
    this.timer += delta;

    const spawnRate =
      this.baseSpawnRate * this.difficulty.spawnMultiplier;

    if (this.timer >= spawnRate) {
      this.timer = 0;

      const waveSize = this.getWaveSize(score);
      const lanes = [...Array(this.lanes.count).keys()];

      for (let i = lanes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lanes[i], lanes[j]] = [lanes[j], lanes[i]];
      }

      const startY = -60;

      for (let i = 0; i < waveSize; i++) {
        const speed =
          (0.25 + Math.random() * 0.15) *
          this.difficulty.speedMultiplier;

        enemies.push(
          new Enemy(this.lanes.getLaneX(lanes[i]), speed, startY)
        );
      }
    }
  }

  getWaveSize(score) {
    const roll = Math.random();
  
    if (roll < 0.30) return 1;      // 30%
    if (roll < 0.55) return 2;      // 25%
    if (roll < 0.72) return 3;      // 17%
    if (roll < 0.85) return 4;      // 13%
    if (roll < 0.95) return 5;      // 10%
  
    // 6 cars only after 300 score
    if (score >= 300) return 6;
  
    return 5; // fallback before 300
  }

}
