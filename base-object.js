export class BaseObject {
  constructor(params) {
    this.scene = params.scene
    this.position = params.position
    this.size = params.size
    this.direction = params.direction
  }

  update() {
    throw new Error('To be implement')
  }

  render() {
    throw new Error('To be implement')
  }
}