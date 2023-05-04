import { BaseObject } from "./base-object"
import { context } from '../context'
import { SpeedUpEffect } from '../effects/speed-up-effect'
import { EnpowerEffect } from '../effects/enpower-effect'
import { FastShootEffect } from '../effects/fast-shoot-effect'
import { BuffEffect } from "../effects/buff-effect"
import { ImmediateEffect } from "../effects/immediate-effect"
import { RecoverHealthEffect } from "../effects/recover-health-effect"

export class Reward extends BaseObject {
  static EffectTime = 20 * 1000
  static RewardTypes = {
    SpeedUp: 'S',
    Enpower: 'P',
    FastShoot: 'F',
    Health: 'H'
  }
  effect: any;
  isDead: any;
  rects: any;
  rewardManager: any;
  type: any;
  constructor(params: any) {
    super(params)
    this.type = this.getRandomType()
    this.rects = params.rects
    this.rewardManager = params.rewardManager
    this.effect = this.getEffect(this.type)
    this.isDead = false
  }
  getRandomType() {
    const values = Object.values(Reward.RewardTypes)
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
      case Reward.RewardTypes.SpeedUp:
        return new SpeedUpEffect(this)
      case Reward.RewardTypes.Enpower:
        return new EnpowerEffect(this)
      case Reward.RewardTypes.FastShoot:
        return new FastShootEffect(this)
      case Reward.RewardTypes.Health:
        return new RecoverHealthEffect(this)
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
            rect.removeEffect(this.effect)
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