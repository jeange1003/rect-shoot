import { AttributeType } from "../../attribute-type.js";
import { BuffEffect } from "./buff-effect.js";

export class SpeedUpEffect extends BuffEffect {
  // @ts-expect-error TS(2416): Property 'applyEffect' in type 'SpeedUpEffect' is ... Remove this comment to see the full error message
  applyEffect(type: any, attribute: any) {
    switch (type) {
      case AttributeType.Speed:
        return { x: attribute.x + 5, y: attribute.y + 5 }
      default:
        return attribute
    }
  }
}