import { Direction } from "../base-types/direction.js";
import { Position } from "../base-types/position.js";
import { Size } from "../base-types/size.js";
import { BaseEffect } from "../effects/base-effect.js";
import { BuffEffect } from "../effects/buff-effect.js";
import { BulletEffect } from "../effects/bullet-effect.js";
import { EnpowerEffect } from '../effects/enpower-effect.js'
import { FastShootEffect } from '../effects/fast-shoot-effect.js'
import { ImmediateEffect } from "../effects/immediate-effect.js";
import { RecoverHealthEffect } from "../effects/recover-health-effect.js";
import { ShotgunEffect } from "../effects/shotgun-effect.js";
import { SpeedUpEffect } from '../effects/speed-up-effect.js'
import { TrackerBulletEffect } from "../effects/tracker-bullet-effect.js";
import { RewardTypes } from "../enums/reward-type.js";
import { context } from '../global/context.js'
import { RewardManager } from "../managers/reward-manager.js";
import { Scene } from "../scene.js";
import { BaseObject } from "./base-object.js";
import { Rect } from "./rect.js";

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
    // const values = Object.values([RewardTypes.Shotgun, RewardTypes.Tracker])
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
      case RewardTypes.Shotgun:
        return new ShotgunEffect()
      case RewardTypes.Tracker:
        return new TrackerBulletEffect()
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
          rect.addBuffEffect(this.effect)
          setTimeout(() => {
            rect.removeBuffEffect(this.effect as BuffEffect)
          }, Reward.EffectTime)
        }
        if (this.effect instanceof BulletEffect) {
          rect.addBulletEffect(this.effect)
          setTimeout(() => {
            rect.removeBulletEffect(this.effect as BulletEffect)
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