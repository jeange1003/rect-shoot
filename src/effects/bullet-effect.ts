import { Bullet } from "../objects/bullet";
import { Rect } from "../objects/rect.js";
import { BaseEffect } from "./base-effect.js";

export abstract class BulletEffect extends BaseEffect {
  abstract applyEffect(bullets: Bullet[]): Bullet[]
}