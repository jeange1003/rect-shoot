import { Scene } from './scene.js'
import { Rect } from './rect.js'
import { Position } from './position.js'
import { keyboardStatus1, keyboardStatus2 } from './keyboard-status.js'
import { canvas } from './canvas.js'
import { Area } from './area.js'
import { RewardManager } from './reward-manager.js'

const scene = new Scene()

const area1 = new Area({ x1: 0, x2: canvas.width, y1: 0, y2: canvas.height })

const rect1 = new Rect(scene, new Position(100, canvas.height / 3), keyboardStatus1, 'gray', { x: 1, y: 0 }, 20, 2, area1)
const rect2 = new Rect(scene, new Position(100, canvas.height / 3 * 2), keyboardStatus2, 'blue', { x: 1, y: 0 }, 20, 2, area1)
rect1.addEnemy(rect2)
rect2.addEnemy(rect1)

scene.addObject(rect1)
scene.addObject(rect2)

new RewardManager({ scene, rects: [rect1, rect2] })

scene.start()