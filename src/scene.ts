import { BaseObject } from './objects/base-object.js'
import { canvas } from './global/canvas.js'
import { context } from './global/context.js'
import { Manager } from './managers/manager.js'
import { Panel } from './panels/panel.js'
import { SceneStatus } from './base-types/scene-status.js'
import { ScenePanel } from './panels/scene-panel.js'
import { Position } from './base-types/position.js'

export class Scene {
  objects: BaseObject[] = []
  managers: Manager[] = []
  panels: Panel[] = []
  status: SceneStatus = SceneStatus.BeforeStart
  scenePanel: ScenePanel = new ScenePanel({ scene: this, position: new Position(canvas.width / 2 - 300, canvas.height / 2) })
  requestId: number = 0
  render = () => {
    if (this.status !== SceneStatus.Running) {
      this.scenePanel.render()
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
    this.requestId = requestAnimationFrame(this.render)
  }
  onStart = (e: KeyboardEvent) => {
    this.render();
    if (e.code === 'Space') {
      this.status = SceneStatus.Running
      this.render();
      document.removeEventListener('keydown', this.onStart)
    }
  }
  onVisibilityChange = () => {
    if (document.hidden) {
      this.status = SceneStatus.Pause
    } else {
      this.status = SceneStatus.Running
    }
  }
  start() {
    this.scenePanel.render()
    document.addEventListener('keydown', this.onStart)
    document.addEventListener('visibilitychange', this.onVisibilityChange, false)
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

  setScenePanel(scenePanel: ScenePanel) {
    this.scenePanel = scenePanel
  }

  dispose() {
    document.removeEventListener('keydown', this.onStart)
    document.removeEventListener('visibilitychange', this.onVisibilityChange, false)
    cancelAnimationFrame(this.requestId)
  }
}