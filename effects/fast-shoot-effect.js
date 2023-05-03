import { AttributeType } from "../attribute-type.js";
import { RewardEffect } from "../reward-effect.js";

export class FastShootEffect extends RewardEffect {
  applyEffect(type, attribute) {
    switch (type) {
      case AttributeType.ShootSpeed:
        return attribute * 2
      default:
        return attribute
    }
  }
}