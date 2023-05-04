import { canvas } from './canvas.js'
import { context } from './context.js'

export class Scene {
  objects = []
  managers = []

  running = true

  render() {
    if (!this.running) {
      return
    }
    for (let manager of this.managers) {
      // @ts-expect-error TS(2339): Property 'update' does not exist on type 'never'.
      manager.update()
    }
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    context.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = this.objects.length - 1; i >= 0; i--) {
      const obj = this.objects[i]
      // @ts-expect-error TS(2339): Property 'update' does not exist on type 'never'.
      obj.update()
    }
    for (let i = this.objects.length - 1; i >= 0; i--) {
      const obj = this.objects[i]
      // @ts-expect-error TS(2339): Property 'isDead' does not exist on type 'never'.
      if (obj.isDead) {
        // obj.destroy()
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
        // requestAnimationFrame(this.render.bind(this))
      }
    }, false)
  }

  stop() {
    this.running = false
  }

  addObject(obj: any) {
    // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
    this.objects.push(obj)
  }

  removeObject(obj: any) {
    // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
    this.objects.splice(this.objects.indexOf(obj), 1)
  }

  addManager(manager: any) {
    // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
    this.managers.push(manager)
  }
}