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
      console.log("Wave size:", waveSize); 
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

    let proposed = 0
   
    if (roll < 0.30) proposed = 1;       // 30%
    else if (roll < 0.55) proposed = 2;  // 25%
    else if (roll < 0.72) proposed = 3;  // 17%
    else if (roll < 0.85) proposed = 4;  // 13%
    else if (roll < 0.95) proposed = 5;  // 10%
    else proposed = 6;

    // ensure a minimum of 3, when score is above 300
    if (score > 300 && proposed < 3) proposed =3;
  }

}
