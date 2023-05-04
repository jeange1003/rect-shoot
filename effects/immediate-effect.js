import { RewardEffect } from "./reward-effect.js";

export class ImmediateEffect extends RewardEffect {
  constructor(reward) {
    super(reward)
  }
  applyEffect() {
    throw new Error('To be implement')
  }
}