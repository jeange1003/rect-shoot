import { Rect } from './rect.js'
import { keyboardStatus2, keyboardStatus1 } from './keyboard-status.js'
import { Position } from './position.js'
import { canvas } from './canvas.js'
import { context } from './context.js'

export class Scene {
  constructor() {
    this.rect1 = new Rect(new Position(100, canvas.height / 2), keyboardStatus1, 'pink')
    this.rect2 = new Rect(new Position(canvas.width - 100, canvas.height / 2), keyboardStatus2, 'blue')
  }
  render() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    this.rect1.update();
    this.rect2.update();
    requestAnimationFrame(this.render.bind(this))
  }
  start() {
    this.render();
  }
}