import { Rect } from './rect.js'
import { keyboardStatus2, keyboardStatus1 } from './keyboard-status.js'
import { Position } from './position.js'
import { canvas } from './canvas.js'
import { context } from './context.js'

export class Scene {
  objects = []

  constructor() {
    this.rect1 = new Rect(this, new Position(100, canvas.height / 2), keyboardStatus1, 'pink', { x: 1, y: 0 })
    this.rect2 = new Rect(this, new Position(canvas.width - 100, canvas.height / 2), keyboardStatus2, 'blue', { x: -1, y: 0 })

    this.objects.push(this.rect1, this.rect2)
  }
  render() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = this.objects.length - 1; i >= 0; i--) {
      const obj = this.objects[i]

      obj.update()
    }
    requestAnimationFrame(this.render.bind(this))
  }
  start() {
    this.render();
  }

  addObject(obj) {
    this.objects.push(obj)
  }

  removeObject(obj) {
    this.objects.splice(this.objects.indexOf(obj), 1)
  }
}