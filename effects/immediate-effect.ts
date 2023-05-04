import { RewardEffect } from "./reward-effect.js";

export class ImmediateEffect extends RewardEffect {
  constructor(reward: any) {
    super(reward)
  }
  applyEffect() {
    throw new Error('To be implement')
  }
}