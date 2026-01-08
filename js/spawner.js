import { Enemy } from "./enemy.js";

export class Spawner {
  constructor(lanes) {
    this.lanes = lanes;
    this.timer = 0;
    this.spawnRate = 900;
  }

  update(delta, enemies) {
    this.timer += delta;

    if (this.timer >= this.spawnRate) {
      this.timer = 0;

      const enemyCount = this.getEnemyCount();
      const usedLanes = new Set();

      for (let i = 0; i < enemyCount; i++) {
        let laneIndex;

        // ensure enemies don't overlap lanes
        do {
          laneIndex = Math.floor(Math.random() * this.lanes.count);
        } while (usedLanes.has(laneIndex));

        usedLanes.add(laneIndex);

        const speed = 0.2 + Math.random() * 0.35;

        enemies.push(
          new Enemy(this.lanes.getLaneX(laneIndex), speed)
        );
      }
    }
  }

  getEnemyCount() {
    const roll = Math.random();

    if (roll < 0.30) return 1; // 30%
    if (roll < 0.60) return 2; // 30%
    if (roll < 0.90) return 3; // 30%
    return 4;                 // 10%
  }
}
