export class Explosion {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    // Use GIF or sprite sheet
    this.img = new Image();
    this.img.src = "assets/explosion.gif"; // your explosion GIF with alpha
    this.loaded = false;

    this.img.onload = () => {
      this.loaded = true;
    };

    this.duration = 600; // duration in ms for how long to show the explosion
    this.elapsed = 0;
    this.done = false;
  }

  update(delta) {
    this.elapsed += delta;
    if (this.elapsed >= this.duration) {
      this.done = true;
    }
  }

  render(ctx) {
    if (!this.loaded) return;

    ctx.drawImage(
      this.img,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }
}
