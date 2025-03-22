import {Action} from "./action.js";

/**
 * ゲームオブジェクト
 */
export class GameObject {
  constructor() {
    /**
         * @type {Action[]} actions
         */
    this.actions = [];
  }

  update() {
    if (this.actions.length > 0) {
      this.actions[0].action(this);
      this.actions[0].count--;
      if (this.actions[0].count === 0) {
        this.actions.shift();
      }
    }
  }

  /**
     * ゲームオブジェクトを描画するメソッド.
     * 継承するオブジェクトで実装する.
     */
  draw() {
    new Error("Not Implemented.");
  }
}
