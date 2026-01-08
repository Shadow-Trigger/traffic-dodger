import { Enemy } from "./enemy.js";

export class Spawner {
  constructor(lanes) {
    this.lanes = lanes;
    this.timer = 0;
    this.spawnRate = 800; // ms
  }

  update(delta, enemies) {
    this.timer += delta;

    if (this.timer > this.spawnRate) {
      this.timer = 0;

      const lane = Math.floor(Math.random() * this.lanes.count);
      const speed = 0.2 + Math.random() * 0.3;

      enemies.push(
        new Enemy(this.lanes.getLaneX(lane), speed)
      );
    }
  }
}

