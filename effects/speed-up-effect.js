import { AttributeType } from "../attribute-type.js";
import { RewardEffect } from "./reward-effect.js";

export class SpeedUpEffect extends RewardEffect {
  applyEffect(type, attribute) {
    switch (type) {
      case AttributeType.Speed:
        return { x: attribute.x + 5, y: attribute.y + 5 }
      default:
        return attribute
    }
  }
}