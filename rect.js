import { Bullet } from './bullet.js';
import { context } from './context.js';
export class Rect {
  constructor(scene, position, keyboardStatus, color, direction) {
    this.scene = scene
    this.position = position
    this.keyboardStatus = keyboardStatus
    this.color = color
    this.speed = { x: 10, y: 10 }
    this.size = { width: 100, height: 100 }
    this.direction = direction
    this.cooldown = 0
  }
  update() {
    if (this.keyboardStatus.isLeftPressed) {
      this.position.x -= this.speed.x
    } else if (this.keyboardStatus.isRightPressed) {
      this.position.x += this.speed.x
    }

    if (this.keyboardStatus.isUpPressed) {
      this.position.y -= this.speed.y
    } else if (this.keyboardStatus.isDownPressed) {
      this.position.y += this.speed.y
    }
    if (this.cooldown > 0) {
      this.cooldown--
    }
    if (this.keyboardStatus.isFirePressed && this.cooldown === 0) {
      this.fire()
      this.cooldown = 60
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
  fire() {
    const bullet = new Bullet(this.scene,
      {
        x: this.position.x + this.direction.x * this.size.width + this.direction.x * 20,
        y: this.position.y + this.direction.y * this.size.height + this.direction.y * 20
      }, {
      x: this.direction.x * 10,
      y: this.direction.y * 10
    }, this.color)
    this.scene.addObject(bullet)
  }
}