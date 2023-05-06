import { Bullet } from "../objects/bullet.js";
import { TrackerBullet } from "../objects/tracker-bullet.js";
import { BulletEffect } from "./bullet-effect.js";

export class TrackerBulletEffect extends BulletEffect {
  get name() {
    return '🚀'
  }
  applyEffect(bullets: Bullet[]): Bullet[] {
    const result = bullets.map(bullet => {
      if (bullet instanceof TrackerBullet) {
        return bullet
      }
      return TrackerBullet.fromBullet(bullet)
    }
    )
    return result
  }
}