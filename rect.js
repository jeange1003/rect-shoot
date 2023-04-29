import { Bullet } from './bullet.js';
import { context } from './context.js';
export class Rect {
  static maxHp = 100
  constructor(scene, position, keyboardStatus, color, direction, damage, shootSpeed) {
    this.scene = scene
    this.position = position
    this.keyboardStatus = keyboardStatus
    this.color = color
    this.speed = { x: 10, y: 10 }
    this.size = { width: 100, height: 100 }
    this.direction = direction
    this.cooldown = 0
    this.hp = 100
    this.damage = damage
    this.shootSpeed = shootSpeed
  }
  update() {
    if (this.keyboardStatus.isLeftPressed) {
      if (this.position.x - this.size.width / 2 > 0) {
        this.position.x -= this.speed.x
      }
    } else if (this.keyboardStatus.isRightPressed) {
      if (this.position.x + this.size.width / 2 < canvas.width) {
        this.position.x += this.speed.x
      }
    }

    if (this.keyboardStatus.isUpPressed) {
      if (this.position.y - this.size.height / 2 > 0) {
        this.position.y -= this.speed.y
      }
    } else if (this.keyboardStatus.isDownPressed) {
      if (this.position.y + this.size.height / 2 < canvas.height) {
        this.position.y += this.speed.y
      }
    }
    if (this.cooldown > 0) {
      this.cooldown--
    }
    if (this.keyboardStatus.isFirePressed && this.cooldown === 0) {
      this.fire()
      this.cooldown = 60 / this.shootSpeed
    }
    this.render()
  }
  render() {
    this.renderSelf()
    this.renderHp()
  }
  fire() {
    const bullet = new Bullet(this.scene,
      {
        x: this.position.x + this.direction.x * this.size.width + this.direction.x * 20,
        y: this.position.y + this.direction.y * this.size.height + this.direction.y * 20
      }, {
      x: this.direction.x * 15,
      y: this.direction.y * 15
    }, this.color, this.enemy, this.damage)
    this.scene.addObject(bullet)
  }
  renderSelf() {
    context.beginPath();
    context.lineWidth = 0;
    context.strokeStyle = 'red';
    context.fillStyle = this.color;
    context.rect(this.position.x - this.size.width / 2, this.position.y - this.size.height / 2, this.size.width, this.size.height);
    context.fill();
  }
  renderHp() {
    context.beginPath();
    context.lineWidth = 0;
    context.strokeStyle = 'green';
    context.fillStyle = this.color;
    context.rect(this.position.x - this.size.width / 2, this.position.y - this.size.height / 2 - 15, this.size.width * (this.hp / Rect.maxHp), 5);
    context.fill();
  }
  setEnemy(enemy) {
    this.enemy = enemy
  }
  hurt(damage) {
    this.hp -= damage
    if (this.hp <= 0) {
      // this.scene.removeObject(this)
      this.isDead = true
    }
  }
  destroy() {

  }
}