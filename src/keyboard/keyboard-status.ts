export abstract class KeyboardStatus {
  constructor() { }

  abstract get isUpPressed(): boolean

  abstract get isDownPressed(): boolean

  abstract get isLeftPressed(): boolean

  abstract get isRightPressed(): boolean

  abstract get isFirePressed(): boolean
}
