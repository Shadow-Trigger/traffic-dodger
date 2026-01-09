import { Enemy } from "./enemy.js";

export class Spawner {
  constructor(lanes, difficulty) {
    this.lanes = lanes;
    this.difficulty = difficulty;
    this.timer = 0;
    this.baseSpawnRate = 1000;
  }

  update(delta, enemies) {
    this.timer += delta;

    const spawnRate =
      this.baseSpawnRate * this.difficulty.spawnMultiplier;

    if (this.timer >= spawnRate) {
      this.timer = 0;

      const waveSize = this.getEnemyCount();
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

  getEnemyCount() {
    const roll = Math.random();
    if (roll < 0.30) return 1;
    if (roll < 0.60) return 2;
    if (roll < 0.90) return 3;
    return 4;
  }
}
