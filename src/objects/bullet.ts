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
  force: number;
  borderBufferLength = 100

  constructor(params: { scene: Scene, position: Position, direction: Direction, speed: Speed, color: string, enemys: Rect[], damage: number, force: number }) {
    super({
      scene: params.scene,
      position: params.position,
      size: new Size(params.damage, Math.floor(params.damage / 6)),
      direction: params.direction
    })
    this.speed = params.speed
    this.color = params.color
    this.enemys = params.enemys
    this.damage = params.damage
    if (isNaN(params.force)) {
      throw new Error('invalid force')
    }
    this.force = params.force
  }
  update() {
    this.speed.x += this.direction.x * this.force / 60
    this.speed.y += this.direction.y * this.force / 60
    if (isNaN(this.position.x)) {
      throw new Error('invalid position')
    }
    this.position.x += this.speed.x
    this.position.y += this.speed.y
    if (this.isOutOfView()) {
      this.isDead = true
    }
    const enemy = this.checkCollision()
    if (enemy) {
      this.hurtEnemy(enemy)
    }
    this.render()
  }
  render() {
    context.save()
    context.beginPath();
    context.lineWidth = 0;
    context.strokeStyle = 'red';
    context.fillStyle = this.color;
    context.translate(this.position.x, this.position.y)
    // if (this.direction.degree < 0 || this.direction.degree > 270) {
    //   console.log('this.direction.degree', this.direction.degree)
    // }
    context.rotate(this.speed.radian)
    // context.rotate((347 * Math.PI) / 180)
    context.rect(- this.size.width / 2, - this.size.height / 2, this.size.width, this.size.height)
    // context.rect(this.position.x - this.size.width / 2, this.position.y - this.size.height / 2, this.size.width, this.size.height);
    context.fill();
    context.restore()
  }
  isOutOfView() {
    return this.position.x > canvas.width + this.borderBufferLength
      || this.position.x < 0 - + this.borderBufferLength
      || this.position.y > canvas.height + this.borderBufferLength
      || this.position.y < 0 - this.borderBufferLength
  }
  checkCollision() {
    for (let enemy of this.enemys) {
      if (!enemy.isDead
        && this.position.x > enemy.position.x - enemy.size.width
        && this.position.x < enemy.position.x + enemy.size.width
        && this.position.y > enemy.position.y - enemy.size.height
        && this.position.y < enemy.position.y + enemy.size.height) {
        return enemy
      }
    }
  }
  hurtEnemy(enemy: Rect) {
    enemy.hurt(this.damage)
    this.isDead = true
  }
}