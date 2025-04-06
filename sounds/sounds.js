/**
 * TIP: 1つのサウンドは連続で play() しても現在再生中のサウンドが終わるまで
 * 再生されないので、音を重ねたい場合は cloneNode() などでコピーして使いましょう。
 */

/**
 * github.io で sounds が404にならないようにする設定
 */
let prefix = "";
let surfix = "";
if (location.hostname === "ssryu.github.io") {
  prefix = "https://github.com/ssryu/one-two-three/blob/main";
  surfix = "?raw=true";
}

/**
 * BackGround Music
 *
 * 営利目的でないと利用できる:
 * https://www.nintendo.co.jp/networkservice_guideline/ja/index.html
 */
export const bgm = new Audio(`${prefix}/sounds/GourmetRace.mp3${surfix}`);

/**
 * 無料効果音
 * https://taira-komori.jpn.org/arms01.html
 */
export const bombSound = new Audio(`${prefix}/sounds/mini_bomb2.mp3${surfix}`);
export const coinSound = new Audio(`${prefix}/sounds/coin05.mp3${surfix}`);
