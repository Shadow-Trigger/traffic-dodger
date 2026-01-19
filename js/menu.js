export class Menu {
  constructor(containerId, onStartGame) {
    this.container = document.getElementById(containerId);
    this.onStartGame = onStartGame;

    this.menuDiv = null;
    this.playButton = null;

    // Skin system
    this.skins = [
      "assets/player.png",         // skin 0
      "assets/player2.png",        // skin 1
      // add more skins here later
    ];
    this.currentSkinIndex = 0;
    this.skinPreview = null;

    this.createMenu();
  }

  createMenu() {
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
    this.menuDiv.style.backgroundColor = "rgba(0,0,0,0.7)";
    this.menuDiv.style.color = "#fff";
    this.menuDiv.style.fontFamily = "Arial, sans-serif";
    this.menuDiv.style.zIndex = "10";

    // Title
    const title = document.createElement("h1");
    title.textContent = "Pixel Racer";
    title.style.marginBottom = "30px";
    title.style.fontSize = "48px";
    this.menuDiv.appendChild(title);

    // Skin selector container
    const skinContainer = document.createElement("div");
    skinContainer.style.display = "flex";
    skinContainer.style.alignItems = "center";
    skinContainer.style.marginBottom = "30px";

    // Left arrow
    const leftArrow = document.createElement("button");
    leftArrow.textContent = "◀";
    leftArrow.style.marginRight = "20px";
    leftArrow.style.fontSize = "24px";
    leftArrow.style.cursor = "pointer";

    // Skin preview
    this.skinPreview = document.createElement("img");
    this.skinPreview.src = this.skins[this.currentSkinIndex];
    this.skinPreview.style.width = "50px";
    this.skinPreview.style.height = "75px";

    // Right arrow
    const rightArrow = document.createElement("button");
    rightArrow.textContent = "▶";
    rightArrow.style.marginLeft = "20px";
    rightArrow.style.fontSize = "24px";
    rightArrow.style.cursor = "pointer";

    skinContainer.appendChild(leftArrow);
    skinContainer.appendChild(this.skinPreview);
    skinContainer.appendChild(rightArrow);
    this.menuDiv.appendChild(skinContainer);

    // Arrow button logic
    leftArrow.addEventListener("click", () => {
      this.currentSkinIndex--;
      if (this.currentSkinIndex < 0) this.currentSkinIndex = this.skins.length - 1;
      this.updateSkinPreview();
    });

    rightArrow.addEventListener("click", () => {
      this.currentSkinIndex++;
      if (this.currentSkinIndex >= this.skins.length) this.currentSkinIndex = 0;
      this.updateSkinPreview();
    });

    // Play button
    this.playButton = document.createElement("button");
    this.playButton.textContent = "Play";
    this.playButton.style.padding = "12px 24px";
    this.playButton.style.fontSize = "20px";
    this.playButton.style.cursor = "pointer";
    this.menuDiv.appendChild(this.playButton);

    this.container.appendChild(this.menuDiv);

    // Play button callback
    this.playButton.addEventListener("click", () => {
      this.hide();
      this.onStartGame(this.skins[this.currentSkinIndex]);
    });
  }

  updateSkinPreview() {
    this.skinPreview.src = this.skins[this.currentSkinIndex];
  }

  show() {
    if (this.menuDiv) this.menuDiv.style.display = "flex";
  }

  hide() {
    if (this.menuDiv) this.menuDiv.style.display = "none";
  }
}
