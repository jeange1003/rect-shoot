import { RewardEffect } from "./reward-effect.js";

export class BuffEffect extends RewardEffect {
  constructor(reward: any) {
    super(reward)
  }
  applyEffect() {
    throw new Error('To be implement')
  }
}