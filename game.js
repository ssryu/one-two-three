import {TextButton} from "./component.js";
import {Player} from "./player.js";
import {Item} from "./item.js";
import {Action} from "./action.js";

// const
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gameState = {
  OPENING: "opening",
  GAME: "game",
  ENDING: "ending"
};

// init
let currentGameState = gameState.OPENING;
let playerNumber = 2;
let currentPlayer = 0;
let previousNumber = 0;
let players = [];
/**
 * コイン、爆弾などのアイテム
 * @type {Item[]}
 */
let items = [];
/**
 * あとアイテムを何回引くか
 * @type {number}
 */
let itemPopCountRemain = 0;
/**
 * 1以上の時はクリックできないようにする
 * @type {number}
 */
let clickCoolDown = 0;
/**
 * 最小のプレイヤー数
 * @type {number}
 */
const playerNumberMin = 2;
/**
 * 最大のプレイヤー数
 * @type {number}
 */
const playerNumberMax = 3;

function initGame() {
  currentGameState = gameState.OPENING;
  currentPlayer = 0;
  previousNumber = 0;
  players = [];
  items = [];
  for (let i = 0; i < 7; i++) {
    items.push(Item.createRandomItem(40, i * 40, 40, 40, ctx));
  }
  canvas.addEventListener("click", handleOpeningScreenClick);
}
initGame();

// opening screen
const playerNumberButton = new TextButton(playerNumber, 200, 200, 40, 40, () => {}, ctx);
const playerDecreaseButton = new TextButton("◀︎", 150, 200, 40, 40, () => {
  playerNumber = Math.max(playerNumber - 1, playerNumberMin);
  playerNumberButton.text = playerNumber;
}, ctx);
const playerIncreaseButton = new TextButton("▶︎", 250, 200, 40, 40, () => {
  playerNumber = Math.min(playerNumber + 1, playerNumberMax);
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

const p1Image = new Image();
p1Image.src = "./images/animal_arupaka.png";
const p2Image = new Image();
p2Image.src = "./images/animal_hiyoko.png";
const p3Image = new Image();
p3Image.src = "./images/animal_panda.png";
const playerImages = [p1Image, p2Image, p3Image];
const playerXPositions = [100, 200, 300];

function startGame() {
  for (let i = 0; i < playerNumber; i++) {
    players.push(new Player(playerXPositions[i], 200, playerImages[i], ctx));
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
const number1Button = new TextButton(1, 100, 500, 100, 40, () => {
  nextTurn(1);
}, ctx);
const number2Button = new TextButton(2, 250, 500, 100, 40, () => {
  nextTurn(2);
}, ctx);
const number3Button = new TextButton(3, 400, 500, 100, 40, () => {
  nextTurn(3);
}, ctx);
const numberButtons = [number1Button, number2Button, number3Button];

function nextTurn(selectedNumber) {
  if (previousNumber === selectedNumber) {
    return;
  }
  if (clickCoolDown > 0) {
    return;
  }

  itemPopCountRemain = selectedNumber;
  animateItems();
  previousNumber = selectedNumber;
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
    items[i].draw();
  }
}

function drawGameScreen() {
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`プレイヤー ${currentPlayer + 1} のターン`, canvas.width / 2, 50);

  drawGameScreenButtons();
  for (let i = 0; i < players.length; i++) {
    players[(i + currentPlayer) % playerNumber].x = playerXPositions[i];
    players[i].draw();
  }
}

// ending screen
const retryButton = new TextButton("もう一度遊ぶ", 150, 200, 150, 40, () => {
  initGame();
  canvas.removeEventListener("click", handleEndingScreenClick);
  currentGameState = gameState.OPENING;
}, ctx);
const endingScreenButtons = [retryButton];

function handleEndingScreenClick(event) {
  for (let button of endingScreenButtons) {
    button.onClick(event);
  }
}

function drawEndingScreenButtons() {
  for (let button of endingScreenButtons) {
    button.draw();
  }
}

function drawEndingScreen() {
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`プレイヤー ${currentPlayer + 1} の勝利`, canvas.width / 2, 100);

  drawEndingScreenButtons();
}

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

function animateItems() {
  items.unshift(Item.createRandomItem(40, -40, 40, 40, ctx));
  clickCoolDown = 20;
  for (let item of items) {
    item.actions.push(new Action(item => {
      item.y += 10;
    }, 4));
  }
  items[items.length - 1].actions.push(new Action(item => {
    item.x += 1;
  }, 10));
  items[items.length - 1].actions.push(new Action(item => {
    itemPopCountRemain--;
    items.pop();
    item.effect(players[currentPlayer]);
    if (players[currentPlayer].score >= 10) {
      canvas.removeEventListener("click", handleGameScreenClick);
      canvas.addEventListener("click", handleEndingScreenClick);
      currentGameState = gameState.ENDING;
      return;
    }
    if (itemPopCountRemain > 0) {
      animateItems();
    }
    if (itemPopCountRemain === 0) {
      currentPlayer = (currentPlayer + 1) % playerNumber;
    }
  }, 1));
}

function update() {
  clickCoolDown--;
  for (let item of items) {
    item.update();
  }
}

function main() {
  update();
  render();
  requestAnimationFrame(main);
}

main();
