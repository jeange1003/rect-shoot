import { Rect } from '../objects/rect.js';
import { KeyboardStatus } from './keyboard-status.js'
export class AiKeyboardStatus extends KeyboardStatus {
  fire: boolean = false;
  horizen: string = '';
  pressLength: number = 0;
  vertical: string = '';
  playerRects: Rect[]
  targetRect: Rect
  controlledRect?: Rect
  constructor(params: { playerRects: Rect[] }) {
    super()
    this.pressLength = Math.random() * 60 * 5
    this.playerRects = params.playerRects
    this.targetRect = params.playerRects[Math.floor(Math.random() * params.playerRects.length)]
    setInterval(() => {
      this.resetVerticalButton()
      this.resetHorizeonButton()
      this.resetFireButton()
    }, 300)
  }

  resetVerticalButton() {
    if (!this.controlledRect) {
      return
    }
    const yDiff = this.targetRect.position.y - this.controlledRect.position.y
    if (yDiff > 0) {
      this.vertical = 'down'
    } else if (yDiff < 0) {
      this.vertical = 'up'
    } else {
      this.vertical = ''
    }
    // const random = Math.random()
    // this.vertical = random < 0.3 ? 'up' : random > 0.7 ? 'down' : ''
  }
  resetHorizeonButton() {
    if (!this.controlledRect) {
      return
    }
    const xDiff = this.targetRect.position.x - this.controlledRect.position.x
    if (xDiff > 0) {
      this.horizen = 'right'
    } else if (xDiff < 0) {
      this.horizen = 'left'
    } else {
      this.horizen = ''
    }
    // const random = Math.random()
    // this.horizen = random < 0.3 ? 'left' : random > 0.7 ? 'right' : ''
  }
  resetFireButton() {
    this.fire = false
    // const random = Math.random()
    // this.fire =  random > 0.9
  }

  controlTarget(rect: Rect) {
    this.controlledRect = rect
  }

  get isUpPressed(): boolean {
    return this.vertical === 'up'
  }
  get isDownPressed() {
    return this.vertical === 'down'
  }

  get isLeftPressed() {
    return this.horizen === 'left'
  }

  get isRightPressed() {
    return this.horizen === 'right'
  }

  get isFirePressed() {
    return this.fire
  }
}