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
  width = 40;
  height = 40;
  /**
     * default function.
     * create random item.
     * @param {number} x
     * @param {number} y
     * @param {CanvasRenderingContext2D} ctx
     * @returns {Item}
     */
  static createRandomItem(x, y, ctx) {
    let random = Math.random();
    if (random < 0.33) {
      return new Coin(x, y, ctx);
    } else if (random < 0.66) {
      return new Bomb(x, y, ctx);
    } else {
      return new Nothing(x, y, ctx);
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

export class Coin extends Item {
  /**
     * @param {number} x
     * @param {number} y
     * @param {CanvasRenderingContext2D} ctx
     */
  constructor(x, y, ctx) {
    super();
    this.image = new Image();
    this.image.src = "./images/coin.png";
    this.x = x;
    this.y = y;
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

export class Bomb extends Item {
  /**
     * @param {number} x
     * @param {number} y
     * @param {CanvasRenderingContext2D} ctx
     */
  constructor(x, y, ctx) {
    super();
    this.image = new Image();
    this.image.src = "./images/bomb.png";
    this.x = x;
    this.y = y;
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

export class Nothing extends Item {
  /**
     * @param {number} x
     * @param {number} y
     * @param {CanvasRenderingContext2D} ctx
     */
  constructor(x, y, ctx) {
    super();
    this.image = new Image();
    this.image.src = "./images/sunflower.png";
    this.x = x;
    this.y = y;
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
