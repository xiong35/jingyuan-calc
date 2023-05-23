/**
 * 景元
 */

import { BUFF, ENEMY_COUNT, E_ENERGY, Names } from "../constants";
import { Character } from "./base/Character";
import { Game } from "./base/Game";
import { Hint, Shift } from "../constants/types";
import { Shen } from "./Shen";

const JingStyle = { color: "#f2c053" };

let originSpeed = 0;

export class Jing extends Character {
  eDmg: number = 0.65;
  qDmg: number = 1.44;
  tingE: number = 0.35;

  constructor(
    hasTing: boolean,
    private ting1Hun: boolean,
    ...args: Shift<ConstructorParameters<typeof Character>>
  ) {
    super(Names.Jing, ...args);
    this.buffs[BUFF.Ting1Hun] = 0;
    originSpeed = this.speed;

    if (hasTing) {
      this.bonusATK += this.tingE * this.baseATK;
    }
  }

  _move(game: Game): Hint {
    const dmg = Math.floor(this.E(game));

    this.buffs[BUFF.Ting1Hun]!--;
    if (!this.buffs[BUFF.Ting1Hun]) {
      this.setSpeed(originSpeed);
    }

    game.increDmg(dmg);

    return {
      content: this.name + " E 造成了 " + dmg + " 点伤害",
      style: JingStyle,
    };
  }

  A() {
    return 0;
  }

  Q(game: Game) {
    const shen = this.findShen(game);

    shen.setLv(shen.lv + 3);

    const dmg = Math.floor(this.atk * this.qDmg * ENEMY_COUNT);

    game.increDmg(dmg);

    const hint: Hint = {
      content: `${this.name} Q 造成了 ${dmg} 点伤害`,
      style: JingStyle,
    };

    // 停云一命 TODO
    if (this.ting1Hun) {
      // HACK: e 结束buff会被清除，所以加了两个，被清一个后面还能有
      this.buffs[BUFF.Ting1Hun] = 2;
      this.setSpeed(originSpeed + 20);
    }

    game.insertQ(hint, dmg);

    this.charge = 5;
  }

  E(game: Game) {
    const needQ = this.increCharge(E_ENERGY);
    if (needQ) {
      this.Q(game);
    }

    const shen = this.findShen(game);
    shen.setLv(shen.lv + 2);

    return this.atk * this.eDmg * ENEMY_COUNT;
  }

  findShen(game: Game) {
    return game.characters.find((c) => c.name === Names.Shen) as Shen;
  }
}
