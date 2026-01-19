import { Player } from "./player.js";
import { LaneManager } from "./lane.js";
import { Spawner } from "./spawner.js";
import { Difficulty } from "./difficulty.js";
import { Score } from "./score.js";
import { Menu } from "./menu.js";

export class Game {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.laneDashOffset = 0;
    this.laneScrollSpeed = 0.25;

    this.lanes = new LaneManager(7, width);

    this.gameStarting = false;
    
    // this.enemies = [];
    // this.lastTime = 0;
    // this.gameOver = false;

    // -----------------------------
    // Menu system
    // -----------------------------
    this.menu = new Menu(ctx.canvas.parentElement.id, (selectedSkin) => this.startFromMenu(selectedSkin));
    this.menu.show();
  }

  startFromMenu(selectedSkin) {
    this.reset(selectedSkin);
    this.menu.hide();
    this.start();
  }

  reset(selectedSkin) {
    this.difficulty = new Difficulty();
    this.score = new Score();
    this.player = new Player(this.lanes, this.height, selectedSkin);
    this.spawner = new Spawner(this.lanes, this.difficulty);
    this.enemies = [];
    this.difficulty.time = 0;
    this.laneDashOffset = 0;
    this.gameOver = false;
  }

  start() {
    this.gameStarting = true;
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(timestamp) {
    if (this.gameOver) return;

    if (this.gameStarting) {
      this.lastTime = timestamp;
      this.gameStarting = false;
    }

    const delta = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(delta);
    this.render();

    requestAnimationFrame(this.loop.bind(this));
  }

  update(delta) {
    if (this.gameOver) return;

    this.player.update();
    this.difficulty.update(delta);
    this.score.update(delta);

    this.spawner.update(delta, this.enemies, this.score.value);

    this.enemies.forEach(enemy => enemy.update(delta));
    this.enemies = this.enemies.filter(enemy => !enemy.offScreen(this.height));

    this.laneDashOffset += this.laneScrollSpeed * this.difficulty.speedMultiplier * delta;

    // Collision
    for (const enemy of this.enemies) {
      if (enemy.collidesWith(this.player)) {
        this.gameOver = true;
        this.menu.show();
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
