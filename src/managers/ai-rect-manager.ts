import { AiKeyboardStatus } from '../keyboard/ai-keyboard-status'
import { canvas } from '../canvas'
import { Area } from '../area'
import { Rect } from '../objects/rect'
import { Position } from '../position'
import { Manager } from './manager'

export class AiRectManager extends Manager {
  cooldown: any;
  playerRects: any;
  scene: any;
  constructor(params: any) {
    super()
    this.scene = params.scene
    this.playerRects = params.playerRects
    this.cooldown = 60
  }
  update() {
    this.cooldown--
    if (this.cooldown <= 0) {
      this.generateAi()
      this.cooldown = 60
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
        size: { width: 50, height: 50 },
        direction: { x: -1, y: 0 },
        keyboardStatus: new AiKeyboardStatus(),
        color: 'gray',
        speed: { x: 2, y: 2 },
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