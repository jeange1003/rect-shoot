export class KeyboardStatus {
  pressedKeys = []

  constructor(keys) {
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
    return this.pressedKeys.includes(this.keys.fire)
  }
}

export const keyboardStatus1 = new KeyboardStatus({
  up: 'w',
  down: 's',
  left: 'a',
  right: 'd',
  fire: 'f'
})
export const keyboardStatus2 = new KeyboardStatus({
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  fire: 'm'
})