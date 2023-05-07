import { RewardType } from "../base-types/reward-type.js";
import { Bullet } from "../objects/bullet.js";
import { Rect } from "../objects/rect.js";
import { BulletEffect } from "./bullet-effect.js";

export class PiercingBulletEffect extends BulletEffect {
  get name() {
    return RewardType.Piercing
  }

  applyEffect(bullets: Bullet[]): Bullet[] {
    const result = bullets.map(bullet => {
      bullet.meta.set('life', 2)
      bullet.addCustomHurtEnemy(function (this: Bullet, enemy: Rect) {
        enemy.hurt(this.damage)
        this.enemys = this.enemys.filter(e => e !== enemy)
        const life = this.meta.get('life') as number
        this.meta.set('life', life - 1)
        if (life - 1 <= 0) {
          this.isDead = true
        }
        return false
      })
      return bullet
    })
    return result
  }
}