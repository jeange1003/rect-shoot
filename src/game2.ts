import { Scene } from './scene.js'
import { Rect } from './objects/rect'
import { Position } from './base-types/position'
import { PlayerKeyboardStatus } from './keyboard/player-keyboard-status.js'
import { canvas } from './global/canvas'
import { Area } from './base-types/area'
import { RewardManager } from './managers/reward-manager'
import { AiRectManager } from './managers/ai-rect-manager'
import { Size } from './base-types/size'

const scene = new Scene()

const area1 = new Area({ x1: 0, x2: canvas.width, y1: 0, y2: canvas.height })
const keyboardStatus1 = new PlayerKeyboardStatus({
  up: 'w',
  down: 's',
  left: 'a',
  right: 'd',
  fire: 'f'
})
const keyboardStatus2 = new PlayerKeyboardStatus({
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  fire: 'm'
})

const rect1 = new Rect({
  scene: scene,
  position: new Position(100, canvas.height / 3),
  direction: { x: 1, y: 0 },
  size: { width: 40, height: 40 },
  keyboardStatus: keyboardStatus1,
  color: 'blue',
  speed: { x: 5, y: 5 },
  hp: 100,
  maxHp: 100,
  damage: 20,
  shootSpeed: 2,
  restrictToArea: area1
})
const rect2 = new Rect({
  scene: scene,
  position: new Position(100, canvas.height / 3 * 2),
  direction: { x: 1, y: 0 },
  size: { width: 40, height: 40 },
  keyboardStatus: keyboardStatus2,
  color: 'red',
  speed: { x: 5, y: 5 },
  hp: 100,
  maxHp: 100,
  damage: 20,
  shootSpeed: 2,
  restrictToArea: area1
})
const aiRectManager = new AiRectManager({ scene, playerRects: [rect1, rect2] })
const rewardManager = new RewardManager({ scene, rects: [rect1, rect2] })
scene.addObject(rect1)
scene.addObject(rect2)
scene.addManager(aiRectManager)
scene.addManager(rewardManager)


scene.start()