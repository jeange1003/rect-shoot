import { BaseObject } from "./base-object.js"
import { context } from './context.js'

export class Reward extends BaseObject {
  static RewardTypes = {
    SpeedUp: 'S',
    Enpower: 'P',
    FastShoot: 'F'
  }
  constructor(params) {
    super(params)
    this.type = this.getRandomType()
  }
  getRandomType() {
    const values = Object.values(Reward.RewardTypes)
    return values[Math.floor(Math.random() * values.length)]
  }
  update() {
    this.render()
  }
  render() {
    context.beginPath();
    // context.lineWidth = 1;
    context.strokeStyle = 'red';
    context.fillStyle = 'red';
    const x = this.position.x - this.size.width / 2
    const y = this.position.y - this.size.height / 2
    context.rect(x, y, this.size.width, this.size.height);
    // context.fill();
    context.font = '16px serif'
    context.fillText(this.type, x + 5, y + this.size.height - 3)
    context.stroke();
  }
}