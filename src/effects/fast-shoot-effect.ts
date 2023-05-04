import { AttributeType } from "../base-types/attribute-type.js";
import { BuffEffect } from "./buff-effect.js";

export class FastShootEffect extends BuffEffect {
  applyEffect(type: AttributeType, attribute: number) {
    switch (type) {
      case AttributeType.ShootSpeed:
        return attribute * 2
      default:
        return attribute
    }
  }
}