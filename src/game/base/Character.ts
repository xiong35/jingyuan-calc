import { BUFF, ROUND_DIST } from "../../constants";
import { Hint } from "../../constants/types";
import { Game } from "./Game";

export abstract class Character {
  tickLeft = 0;
  charge = 0;
  buffs: Partial<Record<BUFF, number>> = {};

  get atk() {
    return this.baseATK + this.bonusATK;
  }

  setSpeed(speed: number) {
    const dist = this.tickLeft * this.speed;

    const newTickLeft = Math.round(dist / speed);

    this.speed = speed;
    this.tickLeft = newTickLeft;

    Game.refreshUI();
  }

  /** 增加能量并返回是否需要开大 */
  increCharge(charge: number) {
    this.charge += charge * this.chargeEfficiency;

    return this.charge >= this.chargeNeed * 0.95;
  }

  constructor(
    public name: string,
    protected baseATK: number,
    protected bonusATK: number,
    protected chargeNeed: number,
    protected chargeEfficiency: number,
    protected speed: number
  ) {}

  abstract _move(game: Game): Hint;

  /**
   * 行动并重置行动条
   */
  move(game: Game) {
    const hint = this._move(game);

    this.tickLeft = Math.round(ROUND_DIST / this.speed);

    return hint;
  }
  abstract A(game: Game): number;
  abstract Q(game: Game): void;
  abstract E(game: Game): number;
}
