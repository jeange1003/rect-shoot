import { AttributeType } from "../attribute-type.js";
import { RewardEffect } from "../reward-effect.js";

export class EnpowerEffect extends RewardEffect {
  applyEffect(type, attribute) {
    switch (type) {
      case AttributeType.Damage:
        return attribute * 2
      default:
        return attribute
    }
  }
}