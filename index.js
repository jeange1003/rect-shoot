import { Scene } from './scene.js'
import { Rect } from './rect.js'
import { Position } from './position.js'
import { keyboardStatus1, keyboardStatus2 } from './keyboard-status.js'
import { canvas } from './canvas.js'
import { Area } from './area.js'
import { RewardManager } from './reward-manager.js'

const scene = new Scene()

const area1 = new Area({ x1: 0, x2: canvas.width / 3 * 2, y1: 0, y2: canvas.height })
const area2 = new Area({ x1: canvas.width / 3, x2: canvas.width, y1: 0, y2: canvas.height })

const rect1 = new Rect(scene, new Position(100, canvas.height / 2), keyboardStatus1, 'gray', { x: 1, y: 0 }, 20, 2, area1)
const rect2 = new Rect(scene, new Position(canvas.width - 100, canvas.height / 2), keyboardStatus2, 'blue', { x: -1, y: 0 }, 40, 1, area2)
rect1.setEnemy(rect2)
rect2.setEnemy(rect1)

scene.addObject(rect1)
scene.addObject(rect2)

new RewardManager({ scene, rects: [rect1, rect2] })

scene.start()