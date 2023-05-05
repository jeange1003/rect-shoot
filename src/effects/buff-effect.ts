import { Attribute } from "../base-types/attribute.js";
import { AttributeType } from "../base-types/attribute-type.js";
import { BaseEffect } from "./base-effect.js";

export abstract class BuffEffect extends BaseEffect {
  abstract applyEffect(type: AttributeType, attribute: Attribute): Attribute;
}