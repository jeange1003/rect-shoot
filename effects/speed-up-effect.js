import { AttributeType } from "../attribute-type.js";
import { BuffEffect } from "./buff-effect.js";

export class SpeedUpEffect extends BuffEffect {
  applyEffect(type, attribute) {
    switch (type) {
      case AttributeType.Speed:
        return { x: attribute.x + 5, y: attribute.y + 5 }
      default:
        return attribute
    }
  }
}