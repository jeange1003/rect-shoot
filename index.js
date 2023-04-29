import { Scene } from './scene.js'
import { Rect } from './rect.js'
import { Position } from './position.js'
import { keyboardStatus1, keyboardStatus2 } from './keyboard-status.js'
import { canvas } from './canvas.js'

const scene = new Scene()

const rect1 = new Rect(scene, new Position(100, canvas.height / 2), keyboardStatus1, 'gray', { x: 1, y: 0 }, 20, 2)
const rect2 = new Rect(scene, new Position(canvas.width - 100, canvas.height / 2), keyboardStatus2, 'blue', { x: -1, y: 0 }, 40, 1)
rect1.setEnemy(rect2)
rect2.setEnemy(rect1)

scene.addObject(rect1)
scene.addObject(rect2)

scene.start()