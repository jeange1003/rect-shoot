import { Vector2 } from "../base-types/vector2.js";
import { Bullet } from "../objects/bullet.js";
import { BulletEffect } from "./bullet-effect.js";

export class TrackerBulletEffect extends BulletEffect {
  get name() {
    return '🚀'
  }

  applyEffect(bullets: Bullet[]): Bullet[] {
    bullets.forEach(bullet => {
      bullet.addCustomUpdate(function (this: Bullet) {
        const target = this.meta.get('target')
        if (target && target.isDead) {
          this.meta.set('target', undefined)
        }
        const aliveEnemys = this.enemys.filter(e => !e.isDead)
        if (aliveEnemys.length > 0) {
          if (!target) {
            this.meta.set('target', aliveEnemys[0])
          }
        }
        if (target) {
          const positionDifference = new Vector2(target.position.x - this.position.x, target.position.y - this.position.y)
          if (isNaN(positionDifference.x)) {
            debugger
          }
          if (positionDifference.x !== 0 && positionDifference.y !== 0) {
            const unitPositionDiff = positionDifference.unit()
            // add turn around speed start
            const unitSpeed = this.speed.unit()
            const unitAdjustDirection = unitPositionDiff.substract(unitSpeed).unit()
            const direction = unitPositionDiff.add(unitAdjustDirection).unit()
            // add turn around speed end
            this.direction.x = direction.x
            this.direction.y = direction.y
          }
        }
        return true
      })
    })
    return bullets
  }
}