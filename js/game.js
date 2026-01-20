import { Player } from "./player.js";
import { LaneManager } from "./lane.js";
import { Spawner } from "./spawner.js";
import { Difficulty } from "./difficulty.js";
import { Score } from "./score.js";
import { Menu } from "./menu.js";
import { Explosion } from "./explosion.js";

export class Game {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.laneDashOffset = 0;
    this.laneScrollSpeed = 0.25;

    this.lanes = new LaneManager(7, width);
    this.gameStarting = false;

    // Menu system
    this.menu = new Menu(ctx.canvas.parentElement.id, (selectedSkin) => this.startFromMenu(selectedSkin));
    this.menu.show();

    // Continuous background explosion (behind everything except menu)
    // this.backgroundExplosion = new Explosion(width / 2, height / 2, width, height);

    // Player-specific explosion (spawned on crash)
    this.playerExplosion = null;
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

    // Reset player explosion
    this.playerExplosion = null;

    // Reset background explosion
    // this.backgroundExplosion = new Explosion(this.width / 2, this.height / 2, this.width, this.height);
  }

  start() {
    this.gameStarting = true;
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(timestamp) {
    if (this.gameOver) {
      //render the last frame (eg, for explosion)
      console.log("Game Over - rendering last frame");
      this.render();
      return;
    }

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
      if (enemy.collidesWith(this.player) && !this.gameOver) {
        console.log("Collision - Game Over");
        this.gameOver = true;

        // Spawn explosion on top of player + everything else
        this.playerExplosion = new Explosion(
          this.player.x,
          this.player.y,
          this.player.width,
          this.player.height
        );

        // this.menu.show();
        // break;
      }
    }

    // Update explosions
    // this.backgroundExplosion.update(delta);
    // if (this.backgroundExplosion.done) {
    //   this.backgroundExplosion = new Explosion(this.width / 2, this.height / 2, this.width, this.height);
    // }

    if (this.playerExplosion) {
      this.playerExplosion.update(delta);
      if (this.playerExplosion.done) {
        this.playerExplosion = null;
      }
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // // Background explosion behind everything
    // this.backgroundExplosion.render(this.ctx);

    // Lanes, player, enemies
    this.drawLaneDividers();
    this.player.render(this.ctx);
    this.enemies.forEach(e => e.render(this.ctx));

    // Player explosion on top
    console.log("Considering player explosion render...");
    if (this.playerExplosion) {
      console.log("Rendering");
      this.playerExplosion.render(this.ctx);
    }

    // Score always on top
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
