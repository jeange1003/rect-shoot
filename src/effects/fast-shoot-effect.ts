import { AttributeType } from "../attribute-type.js";
import { BuffEffect } from "./buff-effect.js";

export class FastShootEffect extends BuffEffect {
  applyEffect(type: any, attribute: any) {
    switch (type) {
      case AttributeType.ShootSpeed:
        return attribute * 2
      default:
        return attribute
    }
  }
}