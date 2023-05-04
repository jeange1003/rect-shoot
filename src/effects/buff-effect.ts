import { Attribute } from "../base-types/attribute";
import { AttributeType } from "../base-types/attribute-type";
import { BaseEffect } from "./base-effect";

export abstract class BuffEffect extends BaseEffect {
  abstract applyEffect(type: AttributeType, attribute: Attribute): void;
}