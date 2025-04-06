import {GameObject} from "./gameObject.js";
import {coinItemImage} from "./item.js";

/**
 * @property {number} hp
 * @property {number} score
 * @property {number} x
 * @property {number} y
 * @property {Image} image
 * @property {CanvasRenderingContext2D} ctx
 */
export class Player extends GameObject {
  /**
     *
     * @param {number} x
     * @param {number} y
     * @param {Image} image
     * @param {CanvasRenderingContext2D} ctx
     */
  constructor(x, y, image, ctx) {
    super();
    this.hp = 20;
    this.score = 0;
    this.x = x;
    this.y = y;
    this.image = image;
    this.ctx = ctx;
  }

  draw() {
    // draw score
    this.ctx.drawImage(coinItemImage, this.x + 10, this.y, 30, 30);
    this.ctx.fillStyle = "black";
    this.ctx.font = "30px Arial";
    this.ctx.fillText(this.score, this.x + 55, this.y + 17);

    // draw hp
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(this.x, this.y + 36, 88, 12);
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x + 84 - (20 - this.hp) * 4, this.y + 40, (20 - this.hp) * 4, 4);

    // draw character
    this.ctx.drawImage(this.image, this.x, this.y + 50, 80, 80);
  }
}
