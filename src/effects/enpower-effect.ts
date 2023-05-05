import { AttributeType } from "../base-types/attribute-type.js";
import { Rect } from "../objects/rect.js";
import { BuffEffect } from "./buff-effect.js";

export class EnpowerEffect extends BuffEffect {
  get name() {
    return 'P'
  }
  applyEffect(type: AttributeType, attribute: number) {
    switch (type) {
      case AttributeType.Damage:
        return attribute * 2
      default:
        return attribute
    }
  }
}