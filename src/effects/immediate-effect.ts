import { Rect } from "../objects/rect.js";
import { BaseEffect } from "./base-effect";

export abstract class ImmediateEffect extends BaseEffect {
  abstract applyEffect(rect: Rect): void;
}