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
const number1Button = new TextButton(1, 100, 200, 100, 40, () => {
  nextTurn(1);
}, ctx);
const number2Button = new TextButton(2, 250, 200, 100, 40, () => {
  nextTurn(2);
}, ctx);
const number3Button = new TextButton(3, 400, 200, 100, 40, () => {
  nextTurn(3);
}, ctx);
const numberButtons = [number1Button, number2Button, number3Button];

function nextTurn(selectedNumber) {
  if (previousNumber === selectedNumber) {
    return;
  }

  for (let i = 0; i < selectedNumber; i++) {
    let item = items.pop();
    switch (item) {
      case itemType.TOKEN:
        players[currentPlayer].score++;
        break;
      case itemType.TRASH:
        break;
    }
    createItem();
  }

  if (players[currentPlayer].score >= 10) {
    canvas.removeEventListener("click", handleGameScreenClick);
    currentGameState = gameState.ENDING;
    return;
  }

  previousNumber = selectedNumber;
  currentPlayer = (currentPlayer + 1) % playerNumber;
}

function handleGameScreenClick(event) {
  for (let button of numberButtons) {
    button.onClick(event);
  }
}

function drawGameScreenButtons() {
  for (let button of numberButtons) {
    button.draw(button.text === previousNumber);
  }
  for (let i = 0; i < items.length; i++) {
    let item = new TextButton(items[i], 200, 300 + i * 70, 60, 60, () => {}, ctx);
    item.draw();
  }
  for (let i = 0; i < players.length; i++) {
    let score = new TextButton(players[i].score, 300, 300 + i * 70, 60, 60, () => {}, ctx);
    score.draw();
  }
}

function drawGameScreen() {
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`プレイヤー ${currentPlayer + 1} のターン`, canvas.width / 2, 50);

  drawGameScreenButtons();
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
