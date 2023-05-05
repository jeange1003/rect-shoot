import { Scene } from './scene.js'
import { Rect } from './objects/rect.js'
import { Position } from './base-types/position.js'
import { PlayerKeyboardStatus } from './keyboard/player-keyboard-status.js'
import { canvas } from './global/canvas.js'
import { Area } from './base-types/area.js'
import { RewardManager } from './managers/reward-manager.js'
import { AiRectManager } from './managers/ai-rect-manager.js'
import { Size } from './base-types/size.js'
import { Direction } from './base-types/direction.js'
import { Speed } from './base-types/speed.js'
import { ScorePanel } from './panels/score-panel.js'
import { GameData } from './game-data.js'
import { Settings } from './settings.js'

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
  direction: new Direction(1, 0),
  size: new Size(40, 40),
  keyboardStatus: keyboardStatus1,
  color: 'blue',
  speed: new Speed(5, 5),
  hp: 100,
  maxHp: 100,
  damage: 20,
  shootSpeed: 2,
  restrictToArea: area1,
  bulletSpeed: 15
})
const rect2 = new Rect({
  scene: scene,
  position: new Position(100, canvas.height / 3 * 2),
  direction: new Direction(1, 0),
  size: new Size(40, 40),
  keyboardStatus: keyboardStatus2,
  color: 'red',
  speed: new Speed(5, 5),
  hp: 100,
  maxHp: 100,
  damage: 20,
  shootSpeed: 2,
  restrictToArea: area1,
  bulletSpeed: 15
})


const settings = new Settings({})
const gameData = new GameData({ settings })
const rewardManager = new RewardManager({ scene, rects: [rect1, rect2], gameData, settings })
const aiRectManager = new AiRectManager({ scene, playerRects: [rect1, rect2], gameData })
const scorePanel = new ScorePanel({ gameData, position: new Position(canvas.width / 2 - 48, 16) })
scene.addObject(rect1)
scene.addObject(rect2)
scene.addManager(aiRectManager)
scene.addManager(rewardManager)
scene.addPanel(scorePanel)
scene.start()