/**
 * TIP: 1つのサウンドは連続で play() しても現在再生中のサウンドが終わるまで
 * 再生されないので、音を重ねたい場合は cloneNode() などでコピーして使いましょう。
 */

/**
 * BackGround Music
 *
 * 営利目的でないと利用できる:
 * https://www.nintendo.co.jp/networkservice_guideline/ja/index.html
 */
export const bgm = new Audio("/sounds/GourmetRace.mp3");

/**
 * 無料効果音
 * https://taira-komori.jpn.org/arms01.html
 */
export const bombSound = new Audio("/sounds/mini_bomb2.mp3");
export const coinSound = new Audio("/sounds/coin05.mp3");
