import { canvas } from './canvas.js'
import { context } from './context.js'

export class Scene {
  objects = []

  running = true

  render() {
    if (!this.running) {
      return
    }
    context.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = this.objects.length - 1; i >= 0; i--) {
      const obj = this.objects[i]
      obj.update()
    }
    for (let i = this.objects.length - 1; i >= 0; i--) {
      const obj = this.objects[i]
      if (obj.isDead) {
        // obj.destroy()
        this.removeObject(obj)
      }
    }
    requestAnimationFrame(this.render.bind(this))
  }
  start() {
    this.render();
  }

  stop() {
    this.running = false
  }

  addObject(obj) {
    this.objects.push(obj)
  }

  removeObject(obj) {
    this.objects.splice(this.objects.indexOf(obj), 1)
  }
}