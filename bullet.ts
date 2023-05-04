import { context } from './context.js'
import { canvas } from './canvas.js'
import { BaseObject } from './base-object.js'

export class Bullet extends BaseObject {
  color: any;
  damage: any;
  enemys: any;
  isDead: any;
  speed: any;

  constructor(scene: any, position: any, speed: any, color: any, enemys: any, damage: any) {
    super({
      scene,
      position,
      size: { width: damage, height: Math.floor(damage / 6) },
    })
    this.scene = scene
    this.position = position
    this.speed = speed
    this.size = { width: damage, height: 3 }
    this.color = color
    this.enemys = enemys
    this.damage = damage
  }
  update() {
    this.position.x += this.speed.x
    this.position.y += this.speed.y
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    if (this.position.x > canvas.width || this.position.x < 0 || this.position.y > canvas.height || this.position.y < 0) {
      // this.scene.removeObject(this)
      this.isDead = true
    }
    this.checkCollision()
    this.draw()
  }
  draw() {
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
        // this.scene.removeObject(this)
        this.isDead = true
      }
    }
  }
}