import {TextButton} from "./component.js";
import {Player} from "./player.js";

// const
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gameState = {
  OPENING: "opening",
  GAME: "game",
  ENDING: "ending"
};
const itemType = {
  TOKEN: "token",
  TRASH: "trash"
};

// init
let currentGameState = gameState.OPENING;
let playerNumber = 2;
let currentPlayer = 0;
let previousNumber = 0;
let players = [];
let items = [];

function createItem() {
  let random = Math.random();
  if (random < 0.3) {
    items.unshift(itemType.TOKEN);
  } else {
    items.unshift(itemType.TRASH);
  }
}

function initGame() {
  currentGameState = gameState.OPENING;
  currentPlayer = 0;
  previousNumber = 0;
  players = [];
  items = [];
  for (let i = 0; i < 7; i++) {
    createItem();
  }
  canvas.addEventListener("click", handleOpeningScreenClick);
}
initGame();

// opening screen
const playerNumberButton = new TextButton(playerNumber, 200, 200, 40, 40, () => {}, ctx);
const playerDecreaseButton = new TextButton("◀︎", 150, 200, 40, 40, () => {
  playerNumber = Math.max(playerNumber - 1, 2);
  playerNumberButton.text = playerNumber;
}, ctx);
const playerIncreaseButton = new TextButton("▶︎", 250, 200, 40, 40, () => {
  playerNumber = Math.min(playerNumber + 1, 8);
  playerNumberButton.text = playerNumber;
}, ctx);
const startGameButton = new TextButton("Game Start", canvas.width / 2 - 75, 300, 150, 50, () => {
  canvas.removeEventListener("click", handleOpeningScreenClick);
  startGame();
}, ctx);
const openingScreenButtons = [playerNumberButton, playerDecreaseButton, playerIncreaseButton, startGameButton];

function handleOpeningScreenClick(event) {
  for (let button of openingScreenButtons) {
    button.onClick(event);
  }
}

function drawOpeningScreenButtons() {
  for (let button of openingScreenButtons) {
    button.draw();
  }
}

function startGame() {
  for (let i = 0; i < playerNumber; i++) {
    players.push(new Player());
  }
  canvas.addEventListener("click", handleGameScreenClick);
  currentGameState = gameState.GAME;
}

function drawOpeningScreen() {
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("プレイ人数を選んでください", canvas.width / 2, 100);

  drawOpeningScreenButtons();
}

// game screen
function drawGameScreen() {
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`プレイヤー 1 のターン`, canvas.width / 2, 50);
}

function drawEndingScreen() {}
// ending screen

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
