import { Names } from "../../constants";
import { Hint } from "../../constants/types";
import { Character } from "./Character";

export class Game {
  totalDmg: number = 0;
  hints: Hint[] = [];

  get queue(): Character[] {
    return this.characters.sort();
  }

  constructor(public characters: Character[]) {
    this.sortByTick();
  }

  private sortByTick() {
    this.characters.sort((a, b) => a.tickLeft - b.tickLeft);
  }

  /**
   * @returns 是否是回合结束
   */
  tick() {
    // 找到第一个人
    const actCharacter = this.characters[0];

    // 所有人移动这么多 tick
    const tick = actCharacter.tickLeft;
    this.characters.forEach((character) => {
      character.tickLeft -= tick;
    });

    // 第一个人行动
    const hint = actCharacter.move(this);
    this.hints.push(hint);
    this.sortByTick();

    // 前端刷新
    Game.refreshUI();

    return actCharacter.name === Names.Rounder;
  }

  tick5Turns() {
    let i = 5;
    while (i) {
      const isTurnOver = this.tick();
      if (isTurnOver) i--;
    }
  }

  increDmg(dmg: number) {
    this.totalDmg += dmg;
  }

  static refreshUI = () => {};

  /** 插入一个立即生效的Q的效果 */
  insertQ(hint: Hint, dmg: number) {
    this.hints.push(hint);

    this.increDmg(dmg);

    Game.refreshUI();
  }
}
