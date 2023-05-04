import { RewardEffect } from "./reward-effect.js";

export abstract class ImmediateEffect extends RewardEffect {
  constructor(reward: any) {
    super(reward)
  }
  abstract applyEffect(rect: any): void;
}