import { ImmediateEffect } from "./immediate-effect.js";

export class RecoverHealthEffect extends ImmediateEffect {
  // @ts-expect-error TS(2416): Property 'applyEffect' in type 'RecoverHealthEffec... Remove this comment to see the full error message
  applyEffect(rect: any) {
    const newHp = rect.hp += 50
    rect.hp = newHp > rect.maxHp ? rect.maxHp : newHp;
  }
}