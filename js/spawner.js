import { Enemy } from "./enemy.js";

export class Spawner {
  constructor(lanes) {
    this.lanes = lanes;
    this.timer = 0;
    this.spawnRate = 1000;
  }

  update(delta, enemies) {
    this.timer += delta;

    if (this.timer >= this.spawnRate) {
      this.timer = 0;

      const waveSize = this.getEnemyCount();
      const availableLanes = [...Array(this.lanes.count).keys()];

      // Shuffle lanes so waves feel random
      for (let i = availableLanes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableLanes[i], availableLanes[j]] =
          [availableLanes[j], availableLanes[i]];
      }

      for (let i = 0; i < waveSize; i++) {
        const laneIndex = availableLanes[i];
        const speed = 0.25 + Math.random() * 0.15;

        // 👇 SAME Y POSITION FOR THE WHOLE WAVE
        enemies.push(
          new Enemy(this.lanes.getLaneX(laneIndex), speed, -60)
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
