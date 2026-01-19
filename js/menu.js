export class Menu {
  constructor(containerId, onStartGame) {
    this.container = document.getElementById(containerId);
    this.onStartGame = onStartGame;

    this.menuDiv = null;
    this.playButton = null;

    this.createMenu();
  }

  createMenu() {
    // Create menu div
    this.menuDiv = document.createElement("div");
    this.menuDiv.style.display = "flex";
    this.menuDiv.style.flexDirection = "column";
    this.menuDiv.style.justifyContent = "center";
    this.menuDiv.style.alignItems = "center";
    this.menuDiv.style.height = "100%";
    this.menuDiv.style.width = "100%";
    this.menuDiv.style.position = "absolute";
    this.menuDiv.style.top = "0";
    this.menuDiv.style.left = "0";
    this.menuDiv.style.backgroundColor = "#222"; // dark background
    this.menuDiv.style.color = "#fff";
    this.menuDiv.style.fontFamily = "Arial, sans-serif";

    // Title
    const title = document.createElement("h1");
    title.textContent = "Pixel Racer";
    title.style.marginBottom = "30px";
    this.menuDiv.appendChild(title);

    // Play button
    this.playButton = document.createElement("button");
    this.playButton.textContent = "Play";
    this.playButton.style.padding = "10px 20px";
    this.playButton.style.fontSize = "18px";
    this.playButton.style.cursor = "pointer";
    this.menuDiv.appendChild(this.playButton);

    // TODO: skin selector placeholder
    const skinPlaceholder = document.createElement("div");
    skinPlaceholder.textContent = "Skin selector (coming soon)";
    skinPlaceholder.style.marginTop = "20px";
    this.menuDiv.appendChild(skinPlaceholder);

    // Add to container
    this.container.appendChild(this.menuDiv);

    // Add button listener
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
