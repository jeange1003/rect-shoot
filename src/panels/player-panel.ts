import { Position } from "../base-types/position.js";
import { context } from "../global/context.js";
import { Rect } from "../objects/rect.js";
import { Panel } from "./panel.js";

export class PlayerPanel extends Panel {
  rect: Rect
  constructor(params: { rect: Rect, position: Position }) {
    super(params)
    this.rect = params.rect
  }
  update(): void {
    this.render()
  }
  render() {
    context.fillStyle = 'red';
    context.font = '16px serif'
    context.fillText(`${this.rect.name}:`, this.position.x, this.position.y)
    const effects = [...this.rect.buffEffects, ...this.rect.bulletEffects]
    for (let i = 0; i < effects.length; i++) {
      const effect = effects[i]
      context.fillText(`${effect.name}: ${Math.floor(effect.remainTime / 60)}`, this.position.x, this.position.y + 16 * (i + 1))
    }
  }
}