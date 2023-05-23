import { Names } from "../constants";
import { Character } from "./base/Character";
import { Game } from "./base/Game";
import { Hint, Shift } from "../constants/types";
import { Jing } from "./Jing";

const ShenStyle = { color: "#f39a47" };

/**
 * 神君，攻击视为 A
 */
export class Shen extends Character {
  lv = 3;
  aDmg = 0.53;

  constructor(...args: Shift<ConstructorParameters<typeof Character>>) {
    super(Names.Shen, ...args);
  }

  _move(game: Game): Hint {
    const dmg = this.A(game);

    const hint = {
      content: `${this.name} A 出 ${this.lv}段，造成了${dmg}点伤害`,
      style: ShenStyle,
    };

    this.setLv(3);

    return hint;
  }

  setLv(lv: number) {
    this.lv = lv;
    if (this.lv > 10) this.lv = 10;

    this.setSpeed(30 + this.lv * 10);
  }

  A(game: Game): number {
    return this.lv * this.findJing(game).atk * (this.aDmg * (1 + 0.25 * 2));
  }

  Q(): number {
    throw new Error("Method not implemented.");
  }
  E(): number {
    throw new Error("Method not implemented.");
  }

  findJing(game: Game) {
    return game.characters.find((c) => c.name === Names.Jing) as Jing;
  }
}
