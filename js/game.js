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

    // Player-specific explosion (spawned on crash)
    this.playerExplosion = null;

    // Setup mobile buttons
    this.setupMobileControls();
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
  }

  /* -----------------------------
     MOBILE BUTTONS
  ----------------------------- */
  setupMobileControls() {
    const leftBtn = document.getElementById("btn-left");
    const rightBtn = document.getElementById("btn-right");

    if (!leftBtn || !rightBtn) return;

    leftBtn.addEventListener("pointerdown", () => {
      if (!this.gameOver && this.player) this.player.moveLeft();
    });

    rightBtn.addEventListener("pointerdown", () => {
      if (!this.gameOver && this.player) this.player.moveRight();
    });
  }

  /* -----------------------------
     GAME LOOP
  ----------------------------- */
  start() {
    this.gameStarting = true;
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(timestamp) {
    if (this.gameOver) {
      this.render(); // render last frame (explosion, score, menu)
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
        this.gameOver = true;

        // Spawn explosion on top of player + everything else
        this.playerExplosion = new Explosion(
          this.player.x,
          this.player.y,
          this.player.width * 2,
          this.player.height * 2
        );

        this.menu.show();
        break;
      }
    }

    // Update explosion if active
    if (this.playerExplosion) {
      this.playerExplosion.update(delta);
      if (this.playerExplosion.done) {
        this.playerExplosion = null;
      }
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Lanes, player, enemies
    this.drawLaneDividers();
    this.player.render(this.ctx);
    this.enemies.forEach(e => e.render(this.ctx));

    // Player explosion on top
    if (this.playerExplosion) {
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
