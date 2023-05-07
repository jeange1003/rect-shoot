import { RewardType } from "../base-types/reward-type.js";

export abstract class BaseEffect {
  abstract get name(): RewardType
}