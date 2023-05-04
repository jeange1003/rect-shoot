import { canvas } from "../global/canvas.js";
import { Manager } from "./manager.js";
import { Reward } from "../objects/reward.js";
import { Scene } from "../scene.js";
import { Rect } from "../objects/rect.js";
import { Direction } from "../base-types/direction.js";
import { Size } from "../base-types/size.js";
import { Position } from "../base-types/position.js";

export class RewardManager extends Manager {
  rewards: Reward[] = []
  static MaxCount = 30
  static CoolDown = 1
  cooldown: number;
  rects: Rect[];
  scene: Scene;
  constructor(params: { scene: Scene, rects: Rect[] }) {
    super()
    this.scene = params.scene
    this.rects = params.rects
    this.cooldown = RewardManager.CoolDown * 60
  }
  update() {
    this.cooldown--
    if (this.cooldown <= 0) {
      this.cooldown = RewardManager.CoolDown * 60
      this.generateReward()
      this.checkVolumn()
    }
  }
  generateReward() {
    const reward = new Reward({
      scene: this.scene,
      position: new Position(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)),
      size: new Size(20, 20),
      direction: new Direction(0, 0),
      rects: this.rects,
      rewardManager: this
    })
    this.rewards.push(reward)
    this.scene.addObject(reward)
  }
  checkVolumn() {
    if (this.rewards.length > RewardManager.MaxCount) {
      const reward = this.rewards.shift()
      if (reward) {
        this.scene.removeObject(reward)
      }
    }
  }
  removeReward(reward: any) {
    this.rewards = this.rewards.filter(r => r !== reward)
  }
}