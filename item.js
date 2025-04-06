import {GameObject} from "./gameObject.js";
import {Player} from "./player.js";

/**
 * Item interface.
 * @property {Image} image
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {CanvasRenderingContext2D} ctx
 */
export class Item extends GameObject {
  /**
     * default function.
     * create random item.
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {CanvasRenderingContext2D} ctx
     * @returns {Item}
     */
  static createRandomItem(x, y, width, height, ctx) {
    let random = Math.random();
    if (random < 0.33) {
      return new Coin(x, y, width, height, ctx);
    } else if (random < 0.66) {
      return new Bomb(x, y, width, height, ctx);
    } else {
      return new Nothing(x, y, width, height, ctx);
    }
  }

  /**
     * default function.
     * move item to input x, y
     * @type {number} x
     * @type {number} y
     */
  move(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
     * default function.
     * draw item.
     */
  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  /**
     * abstract function.
     * effect to player.
     * implement at child class.
     * @type {Player}
     */
  effect(player) {
    new Error("Not Implemented.");
  }
}

export const coinItemImage = new Image();
coinItemImage.src = "./images/coin.png";

export class Coin extends Item {
  image = coinItemImage;

  /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {CanvasRenderingContext2D} ctx
     */
  constructor(x, y, width, height, ctx) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }

  /**
     * Add player's score.
     * @param {Player} player
     */
  effect(player) {
    player.score += 1;
  }
}

export const bombItemImage = new Image();
bombItemImage.src = "./images/bomb.png";

export class Bomb extends Item {
  image = bombItemImage;

  /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {CanvasRenderingContext2D} ctx
     */
  constructor(x, y, width, height, ctx) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }

  /**
     * Reduce player's hp.
     * @param {Player} player
     */
  effect(player) {
    player.hp -= 1;
  }
}

export const nothingItemImage = new Image();
nothingItemImage.src = "./images/sunflower.png";

export class Nothing extends Item {
  image = nothingItemImage;

  /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {CanvasRenderingContext2D} ctx
     */
  constructor(x, y, width, height, ctx) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }

  /**
     * Do nothing.
     * @param {Player} player
     */
  effect(player) {}
}

export class RandomBox extends Item {
  /**
     * Todo.
     * @param {Player} player
     */
  effect(player) {}
}
