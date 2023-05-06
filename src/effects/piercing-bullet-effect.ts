import { Bullet } from "../objects/bullet.js";
import { PiercingBullet } from "../objects/piercing-bullet.js";
import { TrackerBullet } from "../objects/tracker-bullet.js";
import { BulletEffect } from "./bullet-effect.js";

export class PiercingBulletEffect extends BulletEffect {
  get name() {
    return '🏹'
  }

  applyEffect(bullets: Bullet[]): Bullet[] {
    const result = bullets.map(bullet => {
      if (bullet instanceof PiercingBullet) {
        bullet.life += 1
        return bullet
      }
      return PiercingBullet.fromBullet(bullet)
    }
    )
    return result
  }
}