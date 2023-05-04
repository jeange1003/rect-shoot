import { RewardEffect } from "./reward-effect.js";

export class BuffEffect extends RewardEffect {
  constructor(reward) {
    super(reward)
  }
  applyEffect() {
    throw new Error('To be implement')
  }
}