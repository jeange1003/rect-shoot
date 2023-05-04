import { KeyboardStatus } from './keyboard-status.js'
export class PlayerKeyboardStatus extends KeyboardStatus {
  keys: any;
  pressedKeys = []

  constructor(keys: any) {
    super()
    this.keys = keys

    document.addEventListener('keydown', (e) => {
      // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      if (!this.pressedKeys.includes(e.key)) {
        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        this.pressedKeys.push(e.key)
      }
    })

    document.addEventListener('keyup', (e) => {
      // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      if (this.pressedKeys.includes(e.key)) {
        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        this.pressedKeys = this.pressedKeys.slice(0, this.pressedKeys.indexOf(e.key)).concat(this.pressedKeys.slice(this.pressedKeys.indexOf(e.key) + 1, this.pressedKeys.length))
      }
    })
  }

  // @ts-expect-error TS(2416): Property 'isUpPressed' in type 'PlayerKeyboardStat... Remove this comment to see the full error message
  get isUpPressed() {
    // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
    return this.pressedKeys.includes(this.keys.up)
  }

  // @ts-expect-error TS(2416): Property 'isDownPressed' in type 'PlayerKeyboardSt... Remove this comment to see the full error message
  get isDownPressed() {
    // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
    return this.pressedKeys.includes(this.keys.down)
  }

  // @ts-expect-error TS(2416): Property 'isLeftPressed' in type 'PlayerKeyboardSt... Remove this comment to see the full error message
  get isLeftPressed() {
    // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
    return this.pressedKeys.includes(this.keys.left)
  }

  // @ts-expect-error TS(2416): Property 'isRightPressed' in type 'PlayerKeyboardS... Remove this comment to see the full error message
  get isRightPressed() {
    // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
    return this.pressedKeys.includes(this.keys.right)
  }

  // @ts-expect-error TS(2416): Property 'isFirePressed' in type 'PlayerKeyboardSt... Remove this comment to see the full error message
  get isFirePressed() {
    return true //this.pressedKeys.includes(this.keys.fire)
  }
}

