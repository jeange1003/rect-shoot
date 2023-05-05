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
import { GameData } from "../game-data";
import { context } from '../global/context.js'
import { RewardManager } from "../managers/reward-manager.js";
import { Scene } from "../scene.js";
import { BaseObject } from "./base-object.js";
import { Rect } from "./rect.js";

export class Reward extends BaseObject {
  // static EffectTime = 20 * 60
  effect: BaseEffect;
  isDead: boolean;
  rects: Rect[];
  rewardManager: RewardManager;
  type: any;
  gameData: GameData;
  // appliedRect?: Rect;
  // effectTime: number // frame
  constructor(params: {
    scene: Scene,
    position: Position,
    size: Size,
    direction: Direction,
    rects: Rect[],
    rewardManager: RewardManager,
    gameData: GameData
  }) {
    super(params)
    this.gameData = params.gameData
    this.type = this.getRandomType()
    this.rects = params.rects
    this.rewardManager = params.rewardManager
    this.effect = this.getEffect(this.type)
    this.isDead = false
    // this.effectTime = (20 + params.gameData.level) * 60
  }
  getRandomType() {
    // const values = Object.values([RewardTypes.Shotgun, RewardTypes.Tracker])
    const values = Object.values(RewardTypes)
    return values[Math.floor(Math.random() * values.length)]
  }
  update() {
    // if (this.appliedRect) {
    //   this.effectTime--
    //   if (this.effectTime <= 0) {
    //     if (this.effect instanceof BuffEffect) {
    //       this.appliedRect.addBuffEffect(this.effect)
    //       this.appliedRect.removeBuffEffect(this.effect as BuffEffect)
    //     }
    //     if (this.effect instanceof BulletEffect) {
    //       this.appliedRect.removeBulletEffect(this.effect as BulletEffect)
    //     }
    //   }
    // }

    this.checkCollision()
    this.render()
  }
  render() {
    context.beginPath();
    const x = this.position.x - this.size.width / 2
    const y = this.position.y - this.size.height / 2
    if (this.effect instanceof BuffEffect) {
      context.strokeStyle = 'orange';
      context.fillStyle = 'orange';
      context.rect(x, y, this.type.length * 16, this.size.height);
    } else if (this.effect instanceof BulletEffect) {
      context.strokeStyle = 'red';
      context.fillStyle = 'red';
      context.rect(x, y, this.type.length * 16, this.size.height);
    } else if (this.effect instanceof ImmediateEffect) {
      context.strokeStyle = 'gray';
      context.fillStyle = 'gray';
      context.arc(this.position.x, this.position.y, 16, 0, 2 * Math.PI)
    }

    context.font = '16px serif'
    context.fillText(this.type, x + 5, y + this.size.height - 3)
    context.stroke();
  }
  get effectTime() {
    return 20 + this.gameData.level
  }
  getEffect(type: any) {
    switch (type) {
      case RewardTypes.SpeedUp:
        return new SpeedUpEffect({ remainTime: this.effectTime })
      case RewardTypes.Enpower:
        return new EnpowerEffect({ remainTime: this.effectTime })
      case RewardTypes.FastShoot:
        return new FastShootEffect({ remainTime: this.effectTime })
      case RewardTypes.Health:
        return new RecoverHealthEffect()
      case RewardTypes.Shotgun:
        return new ShotgunEffect({ remainTime: this.effectTime })
      case RewardTypes.Tracker:
        return new TrackerBulletEffect({ remainTime: this.effectTime })
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
        // this.appliedRect = rect
        if (this.effect instanceof BuffEffect) {
          rect.addBuffEffect(this.effect)
        }
        if (this.effect instanceof BulletEffect) {
          rect.addBulletEffect(this.effect)
        }
        if (this.effect instanceof ImmediateEffect) {
          this.effect.applyEffect(rect)
        }
        this.rewardManager.removeReward(this)
        this.isDead = true
        break
      }
    }
  }
}