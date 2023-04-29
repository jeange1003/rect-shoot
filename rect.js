import { context } from './context.js';
export class Rect {
  constructor(position, keyboardStatus, color) {
    this.position = position
    this.keyboardStatus = keyboardStatus
    this.color = color
  }
  update() {
    if (this.keyboardStatus.isLeftPressed) {
      this.position.x -= 1
    } else if (this.keyboardStatus.isRightPressed) {
      this.position.x += 1
    }

    if (this.keyboardStatus.isUpPressed) {
      this.position.y -= 1
    } else if (this.keyboardStatus.isDownPressed) {
      this.position.y += 1
    }
    this.draw()
  }
  draw() {
    context.beginPath();
    context.lineWidth = 0;
    context.strokeStyle = 'red';
    context.fillStyle = this.color;
    context.rect(this.position.x, this.position.y, 100, 100);
    context.fill();
  }
}