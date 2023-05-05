import { BaseObject } from './objects/base-object.js'
import { canvas } from './global/canvas.js'
import { context } from './global/context.js'
import { Manager } from './managers/manager.js'
import { Panel } from './panels/panel.js'

export class Scene {
  objects: BaseObject[] = []
  managers: Manager[] = []
  panels: Panel[] = []

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
    for (let panel of this.panels) {
      panel.update()
    }
    requestAnimationFrame(this.render.bind(this))
  }
  start() {
    this.render();
    document.addEventListener('visibilitychange', () => {
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

  addObject(obj: BaseObject) {
    this.objects.push(obj)
  }

  removeObject(obj: BaseObject) {
    this.objects.splice(this.objects.indexOf(obj), 1)
  }

  addManager(manager: Manager) {
    this.managers.push(manager)
  }

  addPanel(panel: Panel) {
    this.panels.push(panel)
  }
}