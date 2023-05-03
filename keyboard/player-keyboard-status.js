import { KeyboardStatus } from './keyboard-status.js'
export class PlayerKeyboardStatus extends KeyboardStatus {
  pressedKeys = []

  constructor(keys) {
    super()
    this.keys = keys

    document.addEventListener('keydown', (e) => {
      if (!this.pressedKeys.includes(e.key)) {
        this.pressedKeys.push(e.key)
      }
    })

    document.addEventListener('keyup', (e) => {
      if (this.pressedKeys.includes(e.key)) {
        this.pressedKeys = this.pressedKeys.slice(0, this.pressedKeys.indexOf(e.key)).concat(this.pressedKeys.slice(this.pressedKeys.indexOf(e.key) + 1, this.pressedKeys.length))
      }
    })
  }

  get isUpPressed() {
    return this.pressedKeys.includes(this.keys.up)
  }

  get isDownPressed() {
    return this.pressedKeys.includes(this.keys.down)
  }

  get isLeftPressed() {
    return this.pressedKeys.includes(this.keys.left)
  }

  get isRightPressed() {
    return this.pressedKeys.includes(this.keys.right)
  }

  get isFirePressed() {
    return true //this.pressedKeys.includes(this.keys.fire)
  }
}

