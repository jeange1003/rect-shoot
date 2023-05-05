import { AiKeyboardStatus } from '../keyboard/ai-keyboard-status.js'
import { canvas } from '../global/canvas.js'
import { Area } from '../base-types/area.js'
import { Rect } from '../objects/rect.js'
import { Position } from '../base-types/position.js'
import { Manager } from './manager.js'
import { Scene } from '../scene.js'
import { Size } from '../base-types/size.js'
import { Direction } from '../base-types/direction.js'
import { Speed } from '../base-types/speed.js'

export class AiRectManager extends Manager {
  static GenerateInterval = 30 // frame
  cooldown: number;
  playerRects: Rect[];
  scene: Scene;
  constructor(params: { scene: Scene, playerRects: Rect[] }) {
    super()
    this.scene = params.scene
    this.playerRects = params.playerRects
    this.cooldown = AiRectManager.GenerateInterval
  }
  update() {
    this.cooldown--
    if (this.cooldown <= 0) {
      this.generateAi()
      this.cooldown = AiRectManager.GenerateInterval
    }
  }
  generateAi() {
    const area = new Area({ x1: 0, x2: canvas.width, y1: 0, y2: canvas.height })
    const aiRect = new Rect(
      {
        scene: this.scene,
        position: new Position(
          canvas.width - Math.floor(Math.random() * 100),
          Math.floor(canvas.height * Math.random())
        ),
        size: new Size(50, 50),
        direction: new Direction(-1, 0),
        keyboardStatus: new AiKeyboardStatus(),
        color: 'gray',
        speed: new Speed(2, 2),
        hp: 40,
        maxHp: 40,
        damage: 20,
        shootSpeed: 2,
        restrictToArea: area
      }
    )
    for (let rect of this.playerRects) {
      rect.addEnemy(aiRect)
      aiRect.addEnemy(rect)
    }
    this.scene.addObject(aiRect)
  }
}