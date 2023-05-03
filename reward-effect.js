import { Reward } from "./reward.js";

export class RewardEffect {
  constructor(reward) {
    this.reward = reward
  }
  applyEffect(rect) {
    switch (this.reward.type) {
      case Reward.RewardTypes.Enpower:
        break;
      case Reward.RewardTypes.FastShoot:
        break;
      case Reward.RewardTypes.SpeedUp:
        break;
    }
  }
}