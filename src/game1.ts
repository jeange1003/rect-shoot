import { Scene } from './scene.js'
import { Rect } from './objects/rect'
import { Position } from './base-types/position'
import { PlayerKeyboardStatus } from './keyboard/player-keyboard-status.js'
import { canvas } from './global/canvas'
import { Area } from './base-types/area'
import { RewardManager } from './managers/reward-manager'
import { Direction } from './base-types/direction'
import { Size } from './base-types/size'
import { Speed } from './base-types/speed'

const scene = new Scene()

const area1 = new Area({ x1: 0, x2: canvas.width / 3 * 2, y1: 0, y2: canvas.height })
const area2 = new Area({ x1: canvas.width / 3, x2: canvas.width, y1: 0, y2: canvas.height })

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
  direction: new Direction(1, 0),
  keyboardStatus: keyboardStatus1,
  color: 'gray',
  speed: new Speed(10, 10),
  size: new Size(100, 100),
  hp: 100,
  maxHp: 100,
  damage: 20,
  shootSpeed: 2,
  restrictToArea: area1
})
const rect2 = new Rect({
  scene: scene,
  position: new Position(canvas.width - 100, canvas.height / 2),
  direction: new Direction(-1, 0),
  keyboardStatus: keyboardStatus2,
  color: 'blue',
  speed: new Speed(10, 10),
  size: new Size(100, 100),
  hp: 100,
  maxHp: 100,
  damage: 40,
  shootSpeed: 1,
  restrictToArea: area2
})

rect1.addEnemy(rect2)
rect2.addEnemy(rect1)

scene.addObject(rect1)
scene.addObject(rect2)

new RewardManager({ scene, rects: [rect1, rect2] })

scene.start()