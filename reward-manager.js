import { canvas } from "./canvas.js";
import { Reward } from "./reward.js";

export class RewardManager {
  rewards = []
  static MaxCount = 3
  constructor(params) {
    this.scene = params.scene

    setInterval(() => {
      this.generateReward()
      this.checkVolumn()
    }, (1000));
  }
  generateReward() {
    const reward = new Reward({
      scene: this.scene,
      position: { x: Math.floor(Math.random() * canvas.width), y: Math.floor(Math.random() * canvas.height) },
      size: { width: 20, height: 20 },
      direction: { x: 0, y: 0 }
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
}