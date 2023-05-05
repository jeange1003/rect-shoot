import { Rect } from "../objects/rect.js";
import { ImmediateEffect } from "./immediate-effect.js";

export class RecoverHealthEffect extends ImmediateEffect {
  get name() {
    return 'H'
  }
  applyEffect(rect: Rect) {
    const newHp = rect.hp += 50
    rect.hp = newHp > rect.maxHp ? rect.maxHp : newHp;
  }
}