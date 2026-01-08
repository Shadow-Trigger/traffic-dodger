import { Enemy } from "./enemy.js";

export class Spawner {
  constructor(lanes) {
    this.lanes = lanes;
    this.timer = 0;
    this.spawnRate = 1000; // time between waves in ms
  }

  update(delta, enemies) {
    this.timer += delta;

    if (this.timer >= this.spawnRate) {
      this.timer = 0;

      const waveSize = this.getEnemyCount(); // 1–4 enemies per wave

      // Make an array of lane indices
      const availableLanes = [...Array(this.lanes.count).keys()];

      // Shuffle lanes so enemies pick random lanes without overlapping
      for (let i = availableLanes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableLanes[i], availableLanes[j]] =
          [availableLanes[j], availableLanes[i]];
      }

      // Spawn all enemies in the wave at the same Y position
      const startY = -60;

      for (let i = 0; i < waveSize; i++) {
        const laneIndex = availableLanes[i];
        const speed = 0.25 + Math.random() * 0.15;

        enemies.push(
          new Enemy(this.lanes.getLaneX(laneIndex), speed, startY)
        );
      }
    }
  }

  // Weighted 1–4 enemies per wave
  getEnemyCount() {
    const roll = Math.random();
    if (roll < 0.30) return 1; // 30%
    if (roll < 0.60) return 2; // 30%
    if (roll < 0.90) return 3; // 30%
    return 4;                  // 10%
  }
}
