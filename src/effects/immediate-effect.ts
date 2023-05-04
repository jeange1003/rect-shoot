import { Rect } from "../objects/rect.js";
import { BaseEffect } from "./base-effect.js";

export abstract class ImmediateEffect extends BaseEffect {
  abstract applyEffect(rect: Rect): void;
}