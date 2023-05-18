import { canvas } from "../global/canvas.js";
import { Manager } from "./manager.js";
import { Reward } from "../objects/reward.js";
import { Scene } from "../scene.js";
import { Rect } from "../objects/rect.js";
import { Direction } from "../base-types/direction.js";
import { Size } from "../base-types/size.js";
import { Position } from "../base-types/position.js";
import { GameData } from "../game-data.js";
import { Settings } from "../settings.js";
import { ImageManager } from "./image-manager.js";
import { Viewport } from "../map/viewport.js";

export class RewardManager extends Manager {
  rewards: Reward[] = []
  cooldown: number;
  rects: Rect[];
  scene: Scene;
  gameData: GameData
  settings: Settings
  imageManager: ImageManager
  viewport: Viewport
  constructor(params: { scene: Scene, rects: Rect[], gameData: GameData, settings: Settings, imageManager: ImageManager, viewport: Viewport }) {
    super()
    this.scene = params.scene
    this.rects = params.rects
    this.gameData = params.gameData
    this.settings = params.settings
    this.cooldown = this.maxCooldown * 60
    this.imageManager = params.imageManager
    this.viewport = params.viewport
  }
  get maxCooldown() {
    // return 1
    // return 0.2
    return 4 - (this.gameData.level / this.settings.levelScore.length) * 2.6
  }
  get maxCount() {
    return 3 + this.gameData.level
  }
  update() {
    this.cooldown--
    if (this.cooldown <= 0) {
      this.cooldown = this.maxCooldown * 60
      this.generateReward()
      this.checkVolumn()
    }
  }
  generateReward() {
    const reward = new Reward({
      scene: this.scene,
      position: new Position(this.viewport.center.x + Math.floor(Math.random() * this.viewport.size.width * 1 / 4), this.viewport.center.y + Math.floor(Math.random() * this.viewport.size.height / 4)),
      size: new Size(20, 20),
      direction: new Direction(0, 0),
      rects: this.rects,
      rewardManager: this,
      gameData: this.gameData,
      imageManager: this.imageManager,
      viewport: this.viewport
    })
    this.rewards.push(reward)
    this.scene.addObject(reward)
  }
  checkVolumn() {
    if (this.rewards.length > this.maxCount) {
      const reward = this.rewards.shift()
      if (reward) {
        this.scene.removeObject(reward)
      }
    }
  }
  removeReward(reward: any) {
    this.rewards = this.rewards.filter(r => r !== reward)
  }
}