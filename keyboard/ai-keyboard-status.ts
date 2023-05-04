import { KeyboardStatus } from './keyboard-status.js'
export class AiKeyboardStatus extends KeyboardStatus {
  fire: any;
  horizen: any;
  pressLength: any;
  vertical: any;
  constructor() {
    super()
    this.pressLength = Math.random() * 60 * 5
    setInterval(() => {
      this.resetVerticalButton()
      this.resetHorizeonButton()
      this.resetFireButton()
    }, 1000)
  }

  resetVerticalButton() {
    const random = Math.random()
    this.vertical = random < 0.3 ? 'up' : random > 0.7 ? 'down' : ''
  }
  resetHorizeonButton() {
    const random = Math.random()
    this.horizen = random < 0.3 ? 'left' : random > 0.7 ? 'right' : ''
  }
  resetFireButton() {
    const random = Math.random()
    this.fire = random > 0.9
  }

  // @ts-expect-error TS(2416): Property 'isUpPressed' in type 'AiKeyboardStatus' ... Remove this comment to see the full error message
  get isUpPressed() {
    return this.vertical === 'up'
  }

  // @ts-expect-error TS(2416): Property 'isDownPressed' in type 'AiKeyboardStatus... Remove this comment to see the full error message
  get isDownPressed() {
    return this.vertical === 'down'
  }

  // @ts-expect-error TS(2416): Property 'isLeftPressed' in type 'AiKeyboardStatus... Remove this comment to see the full error message
  get isLeftPressed() {
    return this.horizen === 'left'
  }

  // @ts-expect-error TS(2416): Property 'isRightPressed' in type 'AiKeyboardStatu... Remove this comment to see the full error message
  get isRightPressed() {
    return this.horizen === 'right'
  }

  get isFirePressed() {
    return this.fire
  }
}