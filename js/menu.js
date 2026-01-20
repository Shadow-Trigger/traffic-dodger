export class Menu {
  constructor(containerId, onStartGame) {
    this.container = document.getElementById(containerId);
    this.onStartGame = onStartGame;

    this.menuDiv = null;
    this.playButton = null;

    // Skins array
    this.skins = [
      "assets/player.png",
      "assets/player2.png",
      "assets/player3.png",
      "assets/player4.png",
      "assets/player5.png"
      // Add more skins here later
    ];
    this.currentSkinIndex = 0;

    // HTML elements for sliding preview
    this.skinWrapper = null;
    this.currentSkinImg = null;
    this.nextSkinImg = null;
    this.animating = false;

    this.createMenu();
  }

  createMenu() {
    // Main menu div
    this.menuDiv = document.createElement("div");
    Object.assign(this.menuDiv.style, {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      position: "absolute",
      top: "0",
      left: "0",
      backgroundColor: "rgba(0,0,0,0.7)",
      color: "#fff",
      fontFamily: "'Press Start 2P', monospace",
      zIndex: "10",
    });

    // Title
    const title = document.createElement("h1");
    title.textContent = "PIXEL RACER";
    Object.assign(title.style, {
      marginBottom: "30px",
      fontSize: "36px",
      textAlign: "center",
      letterSpacing: "2px"
    });
    this.menuDiv.appendChild(title);

    // Skin selector container
    const skinContainer = document.createElement("div");
    Object.assign(skinContainer.style, {
      display: "flex",
      alignItems: "center",
      marginBottom: "30px",
    });

    // Left arrow
    const leftArrow = document.createElement("button");
    leftArrow.textContent = "◀";
    Object.assign(leftArrow.style, {
      marginRight: "20px",
      fontSize: "24px",
      cursor: "pointer",
      fontFamily: "'Press Start 2P', monospace"
    });

    // Right arrow
    const rightArrow = document.createElement("button");
    rightArrow.textContent = "▶";
    Object.assign(rightArrow.style, {
      marginLeft: "20px",
      fontSize: "24px",
      cursor: "pointer",
      fontFamily: "'Press Start 2P', monospace"
    });

    // Skin wrapper (bigger box)
    this.skinWrapper = document.createElement("div");
    Object.assign(this.skinWrapper.style, {
      width: "70px",       // bigger box
      height: "105px",
      overflow: "hidden",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    });

    // Current skin image (scaled down 15%)
    this.currentSkinImg = document.createElement("img");
    this.currentSkinImg.src = this.skins[this.currentSkinIndex];
    Object.assign(this.currentSkinImg.style, {
      position: "absolute",
      width: "42.5px",   // 50px * 0.85
      height: "auto",
      transition: "transform 0.3s ease",
    });
    this.skinWrapper.appendChild(this.currentSkinImg);

    skinContainer.appendChild(leftArrow);
    skinContainer.appendChild(this.skinWrapper);
    skinContainer.appendChild(rightArrow);

    this.menuDiv.appendChild(skinContainer);

    // Play button
    this.playButton = document.createElement("button");
    this.playButton.textContent = "PLAY";
    Object.assign(this.playButton.style, {
      padding: "12px 24px",
      fontSize: "20px",
      cursor: "pointer",
      fontFamily: "'Press Start 2P', monospace"
    });
    this.menuDiv.appendChild(this.playButton);

    this.container.appendChild(this.menuDiv);

    // Arrow button events with sliding animation
    leftArrow.addEventListener("click", () => this.changeSkin(-1));
    rightArrow.addEventListener("click", () => this.changeSkin(1));

    // Play button
    this.playButton.addEventListener("click", () => {
      this.hide();
      this.onStartGame(this.skins[this.currentSkinIndex]);
    });
  }

  changeSkin(direction) {
    if (this.animating) return;

    const oldIndex = this.currentSkinIndex;
    this.currentSkinIndex += direction;
    if (this.currentSkinIndex < 0) this.currentSkinIndex = this.skins.length - 1;
    if (this.currentSkinIndex >= this.skins.length) this.currentSkinIndex = 0;

    this.nextSkinImg = document.createElement("img");
    this.nextSkinImg.src = this.skins[this.currentSkinIndex];
    Object.assign(this.nextSkinImg.style, {
      position: "absolute",
      width: "42.5px", // scaled down
      height: "auto",
      transition: "transform 0.3s ease",
      transform: `translateX(${direction * 100}%)`,
    });
    this.skinWrapper.appendChild(this.nextSkinImg);

    requestAnimationFrame(() => {
      this.animating = true;
      this.currentSkinImg.style.transform = `translateX(${-direction * 100}%)`;
      this.nextSkinImg.style.transform = "translateX(0%)";

      setTimeout(() => {
        this.skinWrapper.removeChild(this.currentSkinImg);
        this.currentSkinImg = this.nextSkinImg;
        this.nextSkinImg = null;
        this.animating = false;
      }, 300);
    });
  }

  show() {
    if (this.menuDiv) this.menuDiv.style.display = "flex";
  }

  hide() {
    if (this.menuDiv) this.menuDiv.style.display = "none";
  }
}
