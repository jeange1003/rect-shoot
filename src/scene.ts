import { BaseObject } from './objects/base-object'
import { canvas } from './canvas.js'
import { context } from './context.js'
import { Manager } from './managers/manager.js'

export class Scene {
  objects: BaseObject[] = []
  managers: Manager[] = []

  running = true

  render() {
    if (!this.running) {
      return
    }
    for (let manager of this.managers) {
      manager.update()
    }
    context.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = this.objects.length - 1; i >= 0; i--) {
      const obj = this.objects[i]
      obj.update()
    }
    for (let i = this.objects.length - 1; i >= 0; i--) {
      const obj = this.objects[i]
      if (obj.isDead) {
        this.removeObject(obj)
      }
    }
    requestAnimationFrame(this.render.bind(this))
  }
  start() {
    this.render();
    document.addEventListener('visibilitychange', () => {
      console.log('document.hidden', document.hidden)
      if (document.hidden) {
        this.running = false
      } else {
        this.running = true
      }
    }, false)
  }

  stop() {
    this.running = false
  }

  addObject(obj: any) {
    this.objects.push(obj)
  }

  removeObject(obj: any) {
    this.objects.splice(this.objects.indexOf(obj), 1)
  }

  addManager(manager: any) {
    this.managers.push(manager)
  }
}