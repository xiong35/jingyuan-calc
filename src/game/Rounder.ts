import { Hint } from "../constants/types";
import { Character } from "./base/Character";

const style = {
  color: "#a3a3a3",
  fontSize: "0.6em",
};

export class Rounder extends Character {
  count = 1;

  _move(): Hint {
    return {
      content: `回合计数 ${this.count++}`,
      style,
    };
  }
  constructor() {
    super("计时器", 0, 0, 0, 0, 100);
  }

  A() {
    return 0;
  }
  Q(): void {}
  E() {
    return 0;
  }
}
