import { context } from './context.js'
import { canvas } from './canvas.js'

export class Bullet {

  constructor(scene, position, speed, color, enemy, damage) {
    this.scene = scene
    this.position = position
    this.speed = speed
    this.size = { width: damage, height: 3 }
    this.color = color
    this.enemy = enemy
    this.damage = damage
  }
  update() {
    this.position.x += this.speed.x
    this.position.y += this.speed.y
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
    if (this.position.x > this.enemy.position.x - this.enemy.size.width
      && this.position.x < this.enemy.position.x + this.enemy.size.width
      && this.position.y > this.enemy.position.y - this.enemy.size.height
      && this.position.y < this.enemy.position.y + this.enemy.size.height) {
      console.log('checkCollision')
      this.enemy.hurt(this.damage)
      // this.scene.removeObject(this)
      this.isDead = true
    }
  }
}