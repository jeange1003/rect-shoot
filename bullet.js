import { context } from './context.js'
import { canvas } from './canvas.js'

export class Bullet {
  constructor(scene, position, speed, color) {
    this.scene = scene
    this.position = position
    this.speed = speed
    this.size = { width: 10, height: 3 }
    this.color = color
  }
  update() {
    this.position.x += this.speed.x
    this.position.y += this.speed.y
    if (this.position.x > canvas.width || this.position.x < 0 || this.position.y > canvas.height || this.position.y < 0) {
      this.scene.removeObject(this)
    }
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
}