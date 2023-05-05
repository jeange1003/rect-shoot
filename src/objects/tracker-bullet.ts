import { context } from '../global/context.js'
import { canvas } from '../global/canvas.js'
import { BaseObject } from './base-object.js'
import { Rect } from './rect.js';
import { Speed } from '../base-types/speed.js';
import { Scene } from '../scene.js';
import { Position } from '../base-types/position.js';
import { Direction } from '../base-types/direction.js';
import { Size } from '../base-types/size.js';
import { Bullet } from './bullet.js';
import { Vector2 } from '../base-types/vector2.js';

export class TrackerBullet extends Bullet {
  target?: Rect

  update() {
    if (this.target && this.target.isDead) {
      this.target = undefined
    }
    if (this.enemys.length > 0) {
      if (!this.target) {
        this.target = this.enemys[Math.floor(this.enemys.length * Math.random())]
      }
    }
    if (this.target) {
      const direction = new Vector2(this.target.position.x - this.position.x, this.target.position.y - this.position.y)
      this.direction.x = direction.x
      this.direction.y = direction.y
      const speedLength = this.speed.length
      const directionLength = direction.length
      this.speed.x = direction.x / directionLength * speedLength
      this.speed.y = direction.y / directionLength * speedLength
    }
    super.update()
  }

  static fromBullet(bullet: Bullet) {
    return new TrackerBullet({
      scene: bullet.scene,
      position: bullet.position,
      direction: bullet.direction,
      speed: bullet.speed,
      color: bullet.color,
      enemys: bullet.enemys,
      damage: bullet.damage
    })
  }
}