export class KeyboardKeys {
  up: string
  right: string
  down: string
  left: string
  fire: string
  constructor(params: { up: string, right: string, down: string, left: string, fire: string }) {
    this.up = params.up
    this.right = params.right
    this.down = params.down
    this.left = params.left
    this.fire = params.fire
  }
}