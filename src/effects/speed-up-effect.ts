import { AttributeType } from "../base-types/attribute-type.js";
import { BuffEffect } from "./buff-effect.js";

export class SpeedUpEffect extends BuffEffect {
  applyEffect(type: AttributeType, attribute: { x: number, y: number }) {
    switch (type) {
      case AttributeType.Speed:
        return { x: attribute.x + 5, y: attribute.y + 5 }
      default:
        return attribute
    }
  }
}