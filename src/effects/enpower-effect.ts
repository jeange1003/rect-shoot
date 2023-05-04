import { AttributeType } from "../attribute-type.js";
import { BuffEffect } from "./buff-effect.js";

export class EnpowerEffect extends BuffEffect {
  applyEffect(type: any, attribute: any) {
    switch (type) {
      case AttributeType.Damage:
        return attribute * 2
      default:
        return attribute
    }
  }
}