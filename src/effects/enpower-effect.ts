import { AttributeType } from "../base-types/attribute-type";
import { Rect } from "../objects/rect";
import { BuffEffect } from "./buff-effect.js";

export class EnpowerEffect extends BuffEffect {
  applyEffect(type: AttributeType, attribute: number) {
    switch (type) {
      case AttributeType.Damage:
        return attribute * 2
      default:
        return attribute
    }
  }
}