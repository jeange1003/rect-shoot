export class BaseObject {
  direction: any;
  position: any;
  scene: any;
  size: any;
  isDead: boolean = false
  constructor(params: any) {
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