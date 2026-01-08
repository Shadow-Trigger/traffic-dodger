import { Player } from "./player.js";
import { LaneManager } from "./lane.js";
import { Spawner } from "./spawner.js";

export class Game {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.lanes = new LaneManager(5, width);
    this.player = new Player(this.lanes, height);
    this.spawner = new Spawner(this.lanes);

    this.enemies = [];
    this.lastTime = 0;

    drawLaneDividers() {
  const laneWidth = this.width / this.lanes.count;

  this.ctx.strokeStyle = "#555";
  this.ctx.setLineDash([20, 20]);
  this.ctx.lineWidth = 2;

  for (let i = 1; i < this.lanes.count; i++) {
    const x = i * laneWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(x, 0);
    this.ctx.lineTo(x, this.height);
    this.ctx.stroke();
  }

  this.ctx.setLineDash([]);
}

  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(timestamp) {
    const delta = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(delta);
    this.render();

    requestAnimationFrame(this.loop.bind(this));
  }

  update(delta) {
    this.player.update();
    this.spawner.update(delta, this.enemies);

    this.enemies.forEach(e => e.update(delta));
    this.enemies = this.enemies.filter(e => !e.offScreen(this.height));

    // Collision check
    this.enemies.forEach(enemy => {
      if (enemy.collidesWith(this.player)) {
        alert("Game Over!");
        window.location.reload();
      }
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.player.render(this.ctx);
    this.enemies.forEach(e => e.render(this.ctx));
  }
}

