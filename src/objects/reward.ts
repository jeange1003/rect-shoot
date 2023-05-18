import { Direction } from "../base-types/direction.js";
import { Position } from "../base-types/position.js";
import { Size } from "../base-types/size.js";
import { BaseEffect } from "../effects/base-effect.js";
import { BuffEffect } from "../effects/buff-effect.js";
import { BulletEffect } from "../effects/bullet-effect.js";
import { PowerUpEffect } from '../effects/power-up-effect.js'
import { FastShootEffect } from '../effects/fast-shoot-effect.js'
import { ImmediateEffect } from "../effects/immediate-effect.js";
import { PiercingBulletEffect } from "../effects/piercing-bullet-effect.js";
import { RecoverHealthEffect } from "../effects/recover-health-effect.js";
import { ShotgunEffect } from "../effects/shotgun-effect.js";
import { SpeedUpEffect } from '../effects/speed-up-effect.js'
import { TrackerBulletEffect } from "../effects/tracker-bullet-effect.js";
import { RewardType } from "../base-types/reward-type.js";
import { GameData } from "../game-data";
import { context } from '../global/context.js'
import { ImageManager } from "../managers/image-manager";
import { RewardManager } from "../managers/reward-manager.js";
import { Scene } from "../scene.js";
import { BaseObject } from "./base-object.js";
import { Rect } from "./rect.js";
import rewardImage from '../configs/reward-image.json' assert {type: 'json'}
import { Viewport } from "../map/viewport.js";

export class Reward extends BaseObject {
  effect: BaseEffect;
  isDead: boolean;
  rects: Rect[];
  rewardManager: RewardManager;
  type: RewardType;
  gameData: GameData;
  imageManager: ImageManager
  constructor(params: {
    scene: Scene,
    position: Position,
    size: Size,
    direction: Direction,
    rects: Rect[],
    rewardManager: RewardManager,
    gameData: GameData,
    imageManager: ImageManager,
    viewport: Viewport
  }) {
    super(params)
    this.gameData = params.gameData
    this.type = this.getRandomType()
    this.rects = params.rects
    this.rewardManager = params.rewardManager
    this.effect = this.getEffect(this.type)
    this.isDead = false
    this.imageManager = params.imageManager
  }
  getRandomType() {
    // return RewardType.Tracker
    const values = Object.values(RewardType)
    return values[Math.floor(Math.random() * values.length)]
  }
  update() {
    this.checkCollision()
    this.render()
  }
  async render() {
    const x = this.position.x - this.size.width / 2
    const y = this.position.y - this.size.height / 2
    const image = await this.imageManager.getImage(`../../assets/images/effects/${rewardImage[this.type]}`)
    context.drawImage(image, x, y, 32, 32)
  }
  /**
   * in frame
   */
  get effectTime() {
    return (20 + this.gameData.level) * 60
  }
  getEffect(type: any) {
    switch (type) {
      case RewardType.SpeedUp:
        return new SpeedUpEffect({ remainTime: this.effectTime })
      case RewardType.PowerUp:
        return new PowerUpEffect({ remainTime: this.effectTime })
      case RewardType.FastShoot:
        return new FastShootEffect({ remainTime: this.effectTime })
      case RewardType.Health:
        return new RecoverHealthEffect()
      case RewardType.Shotgun:
        return new ShotgunEffect({ remainTime: this.effectTime })
      case RewardType.Tracker:
        return new TrackerBulletEffect({ remainTime: this.effectTime })
      case RewardType.Piercing:
        return new PiercingBulletEffect({ remainTime: this.effectTime })
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