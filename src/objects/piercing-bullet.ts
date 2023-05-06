import { Vector2 } from '../base-types/vector2.js';
import { Bullet } from './bullet.js';
import { Rect } from './rect.js';

export class PiercingBullet extends Bullet {
  target?: Rect
  life = 2

  hurtEnemy(enemy: Rect): void {
    enemy.hurt(this.damage)
    this.enemys = this.enemys.filter(e => e !== enemy)
    this.life--
    if (this.life <= 0) {
      this.isDead = true
    }
  }

  static fromBullet(bullet: Bullet) {
    const newBullet = new PiercingBullet({
      scene: bullet.scene,
      position: bullet.position,
      direction: bullet.direction,
      speed: bullet.speed,
      color: bullet.color,
      enemys: bullet.enemys,
      damage: bullet.damage
    })
    Object.setPrototypeOf(Object.getPrototypeOf(newBullet), bullet)
    return newBullet
  }
}