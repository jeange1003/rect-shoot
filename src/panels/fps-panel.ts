import { Position } from "../base-types/position.js";
import { context } from "../global/context.js";
import { Panel } from "./panel.js";

export class FpsPanel extends Panel {
  lastTime: number
  constructor(params: { position: Position }) {
    super(params)
    this.lastTime = Date.now()
  }
  update(): void {
    this.render()
    this.lastTime = Date.now()
  }
  render() {
    context.save()
    context.fillStyle = 'red';
    context.fillText(`FPS: ${Math.floor(1000 / (Date.now() - this.lastTime))}`, this.position.x, this.position.y + 16)
    context.restore()
  }
}