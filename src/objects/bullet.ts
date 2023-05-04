import { context } from '../global/context.js'
import { canvas } from '../global/canvas.js'
import { BaseObject } from './base-object.js'
import { Rect } from './rect.js';
import { Speed } from '../base-types/speed.js';
import { Scene } from '../scene.js';
import { Position } from '../base-types/position.js';
import { Direction } from '../base-types/direction.js';
import { Size } from '../base-types/size.js';

export class Bullet extends BaseObject {
  color: string;
  damage: number;
  enemys: Rect[];
  isDead: boolean = false;
  speed: Speed;

  constructor(params: { scene: Scene, position: Position, speed: Speed, color: string, enemys: Rect[], damage: number }) {
    super({
      scene: params.scene,
      position: params.position,
      size: new Size(params.damage, Math.floor(params.damage / 6)),
      direction: new Direction(0, 0)
    })
    this.scene = params.scene
    this.position = params.position
    this.speed = params.speed
    this.size = new Size(params.damage, 3)
    this.color = params.color
    this.enemys = params.enemys
    this.damage = params.damage
  }
  update() {
    this.position.x += this.speed.x
    this.position.y += this.speed.y
    if (this.position.x > canvas.width || this.position.x < 0 || this.position.y > canvas.height || this.position.y < 0) {
      this.isDead = true
    }
    this.checkCollision()
    this.render()
  }
  render() {
    context.beginPath();
    context.lineWidth = 0;
    context.strokeStyle = 'red';
    context.fillStyle = this.color;
    context.rect(this.position.x - this.size.width / 2, this.position.y - this.size.height / 2, this.size.width, this.size.height);
    context.fill();
  }
  checkCollision() {
    for (let enemy of this.enemys) {
      if (this.position.x > enemy.position.x - enemy.size.width
        && this.position.x < enemy.position.x + enemy.size.width
        && this.position.y > enemy.position.y - enemy.size.height
        && this.position.y < enemy.position.y + enemy.size.height) {
        enemy.hurt(this.damage)
        this.isDead = true
      }
    }
  }
}