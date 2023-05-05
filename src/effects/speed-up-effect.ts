import { AttributeType } from "../base-types/attribute-type.js";
import { Speed } from "../base-types/speed.js";
import { Rect } from "../objects/rect.js";
import { BuffEffect } from "./buff-effect.js";

export class SpeedUpEffect extends BuffEffect {
  applyEffect(type: AttributeType, attribute: Speed) {
    switch (type) {
      case AttributeType.Speed:
        let x = attribute.x + 5
        if (x > Rect.MaxSpeed.x) {
          x = Rect.MaxSpeed.x
        }
        let y = attribute.y + 5
        if (y > Rect.MaxSpeed.y) {
          y = Rect.MaxSpeed.y
        }
        return new Speed(x, y)
      default:
        return attribute
    }
  }
}