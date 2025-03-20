const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gameState = {
  OPENING: "opening",
  GAME: "game",
  ENDING: "ending"
};
let currentGameState = gameState.OPENING;
let playerNumber = 2;

class TextButton {
  constructor(text, x, y, width, height, onClick, useGameState) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    canvas.addEventListener("click", function (event) {
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;

      if (mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height && currentGameState === useGameState) {
        onClick();
      }
    });
  }

  draw(isDisabled = false) {
    ctx.fillStyle = isDisabled
      ? "gray"
      : "#4CAF50";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2 + 6);
  }
}

const playerNumberButton = new TextButton(playerNumber, 200, 200, 40, 40, () => {
  currentGameState = gameState.GAME;
}, gameState.OPENING);
const playerDecreaseButton = new TextButton("◀︎", 150, 200, 40, 40, () => {
  playerNumber = Math.max(playerNumber - 1, 2);
  playerNumberButton.text = playerNumber;
}, gameState.OPENING);
const playerIncreaseButton = new TextButton("▶︎", 250, 200, 40, 40, () => {
  playerNumber = Math.min(playerNumber + 1, 8);
  playerNumberButton.text = playerNumber;
}, gameState.OPENING);

//"Game Start 버튼 추가"
const startGameButton = new TextButton("Game Start", canvas.width /  2 - 75, 300, 150, 50, () => {
    currentGameState = gameState.GAME;
  }, gameState.OPENING);

function drawOpeningScreen() {
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("プレイ人数を選んでください", canvas.width / 2, 100);

  playerDecreaseButton.draw();
  playerNumberButton.draw();
  playerIncreaseButton.draw();
  startGameButton.draw(); //"Game Start" 버튼 추가
}

function drawGameScreen() {
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`プレイヤー 1 のターン`, canvas.width / 2, 50);
}

function drawEndingScreen() {}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  switch (currentGameState) {
    case gameState.OPENING:
      drawOpeningScreen();
      break;
    case gameState.GAME:
      drawGameScreen();
      break;
    case gameState.ENDING:
      drawEndingScreen();
      break;
  }
}

function main() {
  render();
  requestAnimationFrame(main);
}

main();

