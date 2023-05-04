import { RewardEffect } from "./reward-effect.js";

export abstract class BuffEffect extends RewardEffect {
  constructor(reward: any) {
    super(reward)
  }
  abstract applyEffect(type: any, attribute: any): void;
}