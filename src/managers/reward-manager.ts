import { canvas } from "../canvas";
import { Manager } from "./manager";
import { Reward } from "../objects/reward";

export class RewardManager extends Manager {
  rewards: Reward[] = []
  static MaxCount = 3
  cooldown: any;
  rects: any;
  scene: any;
  constructor(params: any) {
    super()
    this.scene = params.scene
    this.rects = params.rects
    this.cooldown = 5 * 60
  }
  update() {
    this.cooldown--
    if (this.cooldown <= 0) {
      this.cooldown = 5 * 60
      this.generateReward()
      this.checkVolumn()
    }
  }
  generateReward() {
    const reward = new Reward({
      scene: this.scene,
      position: { x: Math.floor(Math.random() * canvas.width), y: Math.floor(Math.random() * canvas.height) },
      size: { width: 20, height: 20 },
      direction: { x: 0, y: 0 },
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