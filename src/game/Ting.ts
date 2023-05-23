import { A_ENERGY, E_ENERGY, Names } from "../constants";
import { Hint, Shift } from "../constants/types";
import { Jing } from "./Jing";
import { Character } from "./base/Character";
import { Game } from "./base/Game";

const style = {
  color: "#774dc4",
};

/**
 * 停云只是充能工具人
 */
export class Ting extends Character {
  lastAct: "A" | "E" = "A";

  constructor(...args: Shift<ConstructorParameters<typeof Character>>) {
    super(Names.Ting, ...args);
  }

  _move(game: Game): Hint {
    if (this.lastAct === "A") {
      this.E(game);
      this.lastAct = "E";
    } else {
      this.A(game);
      this.lastAct = "A";
    }

    return {
      content: `${this.name} ${this.lastAct}`,
      style,
    };
  }

  A(game: Game): number {
    const canQ = this.increCharge(A_ENERGY);
    if (canQ) {
      this.Q(game);
    }
    return 0;
  }

  Q(game: Game): void {
    const hint: Hint = {
      content: `${this.name} Q`,
      style,
    };
    game.insertQ(hint, 0);

    const jing = this.findJing(game);
    const jingCanQ = jing.increCharge(50);

    if (jingCanQ) {
      jing.Q(game);
    }

    this.charge = 5;
  }

  E(game: Game): number {
    const canQ = this.increCharge(E_ENERGY);
    if (canQ) {
      this.Q(game);
    }
    return 0;
  }

  findJing(game: Game) {
    return game.characters.find((c) => c.name === Names.Jing) as Jing;
  }
}
