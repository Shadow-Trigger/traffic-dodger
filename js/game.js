import { Player } from "./player.js";
import { LaneManager } from "./lane.js";
import { Spawner } from "./spawner.js";
import { Difficulty } from "./difficulty.js";
import { Score } from "./score.js";

export class Game {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.lanes = new LaneManager(7, width);
    this.player = new Player(this.lanes, height);

    this.difficulty = new Difficulty();
    this.score = new Score();

    this.spawner = new Spawner(this.lanes, this.difficulty);

    this.enemies = [];
    this.lastTime = 0;
    this.gameOver = false;

    this.laneDashOffset = 0;
    this.laneScrollSpeed = 0.25;
  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(timestamp) {
    if (this.gameOver) return;

    const delta = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(delta);
    this.render();

    requestAnimationFrame(this.loop.bind(this));
  }

  update(delta) {
    this.player.update();
    this.difficulty.update(delta);
    this.score.update(delta);

    this.spawner.update(delta, this.enemies);

    this.enemies.forEach(enemy => enemy.update(delta));
    this.enemies = this.enemies.filter(
      enemy => !enemy.offScreen(this.height)
    );

    this.laneDashOffset +=
      this.laneScrollSpeed *
      this.difficulty.speedMultiplier *
      delta;

    for (const enemy of this.enemies) {
      if (enemy.collidesWith(this.player)) {
        this.gameOver = true;
        alert(`Game Over!\nScore: ${Math.floor(this.score.value)}`);
        window.location.reload();
        break;
      }
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawLaneDividers();
    this.player.render(this.ctx);
    this.enemies.forEach(e => e.render(this.ctx));
    this.score.render(this.ctx);
  }

  drawLaneDividers() {
    const laneWidth = this.width / this.lanes.count;

    this.ctx.strokeStyle = "#555";
    this.ctx.setLineDash([30, 30]);
    this.ctx.lineDashOffset = -this.laneDashOffset;
    this.ctx.lineWidth = 2;

    for (let i = 1; i < this.lanes.count; i++) {
      const x = i * laneWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }

    this.ctx.setLineDash([]);
    this.ctx.lineDashOffset = 0;
  }
}
