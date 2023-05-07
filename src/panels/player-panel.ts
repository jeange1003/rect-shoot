import { Position } from "../base-types/position.js";
import { context } from "../global/context.js";
import { ImageManager } from "../managers/image-manager.js";
import { Rect } from "../objects/rect.js";
import { Panel } from "./panel.js";
import rewardImage from '../configs/reward-image.json' assert {type: 'json'}

export class PlayerPanel extends Panel {
  rect: Rect
  imageManager: ImageManager
  constructor(params: { rect: Rect, position: Position, imageManager: ImageManager }) {
    super(params)
    this.rect = params.rect
    this.imageManager = params.imageManager
  }
  update(): void {
    this.render()
  }
  async render() {
    context.fillStyle = 'red';
    context.font = '16px serif'
    context.fillText(`${this.rect.name}:`, this.position.x, this.position.y)
    const effects = [...this.rect.buffEffects, ...this.rect.bulletEffects]
    const images = await Promise.all(effects.map(effect => this.imageManager.getImage(`../../assets/images/effects/${rewardImage[effect.name]}`)))
    for (let i = 0; i < images.length; i++) {
      const x = this.position.x
      const y = this.position.y + 18 * (i + 1)
      context.drawImage(images[i], this.position.x, y, 16, 16)
      const effect = effects[i]
      context.fillText(`${Math.floor(effect.remainTime / 60)}`, this.position.x + 20, y + 15)
    }
  }
}