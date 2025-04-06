/**
 * 特定の操作を特定回実行するという情報をもつクラス
 */
export class Action {
  /**
     * @param {function} action 実行内容
     * @param {number} count 実行回数
     */
  constructor(action, count) {
    this.action = action;
    this.count = count;
  }
}
