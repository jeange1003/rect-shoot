import { AttributeType } from "../../attribute-type.js";
import { BuffEffect } from "./buff-effect.js";

export class FastShootEffect extends BuffEffect {
  // @ts-expect-error TS(2416): Property 'applyEffect' in type 'FastShootEffect' i... Remove this comment to see the full error message
  applyEffect(type: any, attribute: any) {
    switch (type) {
      case AttributeType.ShootSpeed:
        return attribute * 2
      default:
        return attribute
    }
  }
}