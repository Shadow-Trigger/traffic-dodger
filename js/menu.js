export class Menu {
  constructor(containerId, onStartGame) {
    this.container = document.getElementById(containerId);
    this.onStartGame = onStartGame;

    this.menuDiv = document.createElement("div");
    this.playButton = document.createElement("button");

    this.menuDiv.style.display = "flex";
    this.menuDiv.style.flexDirection = "column";
    this.menuDiv.style.justifyContent = "center";
    this.menuDiv.style.alignItems = "center";
    this.menuDiv.style.height = "100%";
    this.menuDiv.style.width = "100%";
    this.menuDiv.style.position = "absolute";
    this.menuDiv.style.top = "0";
    this.menuDiv.style.left = "0";
    this.menuDiv.style.backgroundColor = "rgba(0,0,0,0.7)";
    this.menuDiv.style.color = "#fff";
    this.menuDiv.style.fontFamily = "Arial, sans-serif";
    this.menuDiv.style.zIndex = "10";

    const title = document.createElement("h1");
    title.textContent = "Pixel Racer";
    title.style.marginBottom = "30px";
    this.menuDiv.appendChild(title);

    // Play button
    this.playButton.textContent = "Play";
    this.playButton.style.padding = "12px 24px";
    this.playButton.style.fontSize = "20px";
    this.playButton.style.cursor = "pointer";

    this.menuDiv.appendChild(this.playButton);
    this.container.appendChild(this.menuDiv);

    this.playButton.addEventListener("click", () => {
      this.hide();
      this.onStartGame();
    });
  }

  show() {
    if (this.menuDiv) this.menuDiv.style.display = "flex";
  }

  hide() {
    if (this.menuDiv) this.menuDiv.style.display = "none";
  }
}
