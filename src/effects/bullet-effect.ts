import { Bullet } from "../objects/bullet";
import { Rect } from "../objects/rect.js";
import { BaseEffect } from "./base-effect.js";

export abstract class BulletEffect extends BaseEffect {
  remainTime: number
  constructor(params: { remainTime: number }) {
    super()
    this.remainTime = params.remainTime
  }
  abstract applyEffect(bullets: Bullet[]): Bullet[]
}