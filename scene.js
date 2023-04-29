import { Rect } from './rect.js'
import { keyboardStatus2, keyboardStatus1 } from './keyboard-status.js'
import { Position } from './position.js'

export class Scene {
  constructor() {
    this.rect1 = new Rect(new Position(0, 0), keyboardStatus1, 'pink')
    this.rect2 = new Rect(new Position(500, 0), keyboardStatus2, 'blue')
  }
  render() {
    this.rect1.update();
    this.rect2.update();
    requestAnimationFrame(this.render.bind(this))
  }
  start() {
    this.render();
  }
}