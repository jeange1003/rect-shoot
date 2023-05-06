import { Vector2 } from '../base-types/vector2.js';
import { Bullet } from './bullet.js';
import { Rect } from './rect.js';

export class TrackerBullet extends Bullet {
  target?: Rect

  update() {
    if (this.target && this.target.isDead) {
      this.target = undefined
    }
    const aliveEnemys = this.enemys.filter(e => !e.isDead)
    if (aliveEnemys.length > 0) {
      if (!this.target) {
        this.target = aliveEnemys[0]
        // this.target = aliveEnemys[Math.floor(aliveEnemys.length * Math.random())]
      }
    }
    if (this.target) {
      const positionDifference = new Vector2(this.target.position.x - this.position.x, this.target.position.y - this.position.y)
      if (isNaN(positionDifference.x)) {
        debugger
      }
      if (positionDifference.x !== 0 && positionDifference.y !== 0) {

        const unitPositionDiff = positionDifference.unit()
        // add turn around speed start
        const unitSpeed = this.speed.unit()
        const direction = unitPositionDiff.substract(unitSpeed).unit()
        // add turn around speed end
        this.direction.x = direction.x
        this.direction.y = direction.y
        console.log('direction', direction)


        // const speedLength = this.speed.length

        // this.speed.x = direction.x / directionLength * speedLength
        // this.speed.y = direction.y / directionLength * speedLength
      }
    }
    super.update()
  }

  static fromBullet(bullet: Bullet) {
    const newBullet = new TrackerBullet({
      scene: bullet.scene,
      position: bullet.position,
      direction: bullet.direction,
      speed: bullet.speed,
      color: bullet.color,
      enemys: bullet.enemys,
      damage: bullet.damage,
      force: bullet.force
    })
    // This is not very OOM, but convenient to implement multiple bullet effect on one bullet
    Object.setPrototypeOf(Object.getPrototypeOf(newBullet), bullet)
    return newBullet
  }
}