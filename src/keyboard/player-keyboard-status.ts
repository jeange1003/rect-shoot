import { KeyboardKeys } from '../base-types/keyboard-keys.js';
import { KeyboardStatus } from './keyboard-status.js'

export class PlayerKeyboardStatus extends KeyboardStatus {
  keys: KeyboardKeys;
  pressedKeys: string[] = []

  constructor(keys: KeyboardKeys) {
    super()
    this.keys = keys
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
  }

  onKeyDown = (e: KeyboardEvent) => {
    if (!this.pressedKeys.includes(e.key)) {
      this.pressedKeys.push(e.key)
    }
  }

  onKeyUp = (e: KeyboardEvent) => {
    if (this.pressedKeys.includes(e.key)) {
      this.pressedKeys = this.pressedKeys.slice(0, this.pressedKeys.indexOf(e.key)).concat(this.pressedKeys.slice(this.pressedKeys.indexOf(e.key) + 1, this.pressedKeys.length))
    }
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
    return true
  }

  dispose() {
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)
  }
}

