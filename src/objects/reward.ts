import { Direction } from "../base-types/direction"
import { Position } from "../base-types/position"
import { Size } from "../base-types/size"
import { BaseEffect } from "../effects/base-effect"
import { BuffEffect } from "../effects/buff-effect"
import { EnpowerEffect } from '../effects/enpower-effect'
import { FastShootEffect } from '../effects/fast-shoot-effect'
import { ImmediateEffect } from "../effects/immediate-effect"
import { RecoverHealthEffect } from "../effects/recover-health-effect"
import { SpeedUpEffect } from '../effects/speed-up-effect'
import { RewardTypes } from "../enums/reward-type"
import { context } from '../global/context'
import { RewardManager } from "../managers/reward-manager"
import { Scene } from "../scene"
import { BaseObject } from "./base-object"
import { Rect } from "./rect"

export class Reward extends BaseObject {
  static EffectTime = 20 * 1000
  effect: BaseEffect;
  isDead: boolean;
  rects: Rect[];
  rewardManager: RewardManager;
  type: any;
  constructor(params: {
    scene: Scene,
    position: Position,
    size: Size,
    direction: Direction,
    rects: Rect[],
    rewardManager: RewardManager
  }) {
    super(params)
    this.type = this.getRandomType()
    this.rects = params.rects
    this.rewardManager = params.rewardManager
    this.effect = this.getEffect(this.type)
    this.isDead = false
  }
  getRandomType() {
    const values = Object.values(RewardTypes)
    return values[Math.floor(Math.random() * values.length)]
  }
  update() {
    this.checkCollision()
    this.render()
  }
  render() {
    context.beginPath();
    context.strokeStyle = 'red';
    context.fillStyle = 'red';
    const x = this.position.x - this.size.width / 2
    const y = this.position.y - this.size.height / 2
    context.rect(x, y, this.size.width, this.size.height);
    context.font = '16px serif'
    context.fillText(this.type, x + 5, y + this.size.height - 3)
    context.stroke();
  }
  getEffect(type: any) {
    switch (type) {
      case RewardTypes.SpeedUp:
        return new SpeedUpEffect()
      case RewardTypes.Enpower:
        return new EnpowerEffect()
      case RewardTypes.FastShoot:
        return new FastShootEffect()
      case RewardTypes.Health:
        return new RecoverHealthEffect()
      default:
        throw new Error('Illigal reward type')
    }
  }
  checkCollision() {
    for (let rect of this.rects) {
      const xDistance = Math.abs(this.position.x - rect.position.x)
      const yDistance = Math.abs(this.position.y - rect.position.y)
      if (xDistance < (this.size.width + rect.size.width) / 2
        && yDistance < (this.size.height + rect.size.height) / 2) {
        if (this.effect instanceof BuffEffect) {
          rect.addEffect(this.effect)
          setTimeout(() => {
            rect.removeEffect(this.effect as BuffEffect)
          }, Reward.EffectTime)
        }
        if (this.effect instanceof ImmediateEffect) {
          this.effect.applyEffect(rect)
        }
        this.rewardManager.removeReward(this)
        this.isDead = true
      }
    }
  }
}