export abstract class KeyboardStatus {
  abstract get isUpPressed(): boolean

  abstract get isDownPressed(): boolean

  abstract get isLeftPressed(): boolean

  abstract get isRightPressed(): boolean

  abstract get isFirePressed(): boolean
}
