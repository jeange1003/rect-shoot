import { Attribute } from "../base-types/attribute.js";
import { AttributeType } from "../base-types/attribute-type.js";
import { BaseEffect } from "./base-effect.js";

export abstract class BuffEffect extends BaseEffect {
  remainTime: number
  constructor(params: { remainTime: number }) {
    super()
    this.remainTime = params.remainTime
  }
  abstract applyEffect(type: AttributeType, attribute: Attribute): Attribute;
}