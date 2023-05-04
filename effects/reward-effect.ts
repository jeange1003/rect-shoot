export class RewardEffect {
  reward: any;
  constructor(reward: any) {
    this.reward = reward
  }
  applyEffect() {
    throw new Error('To be implement')
  }
}