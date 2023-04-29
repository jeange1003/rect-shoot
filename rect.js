import { context } from './context.js';
export class Rect {
  constructor(position, keyboardStatus, color) {
    this.position = position
    this.keyboardStatus = keyboardStatus
    this.color = color
    this.speed = { x: 10, y: 10 }
    this.size = { width: 100, height: 100 }
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