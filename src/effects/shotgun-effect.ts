import { Bullet } from "../objects/bullet.js";
import { BulletEffect } from "./bullet-effect.js";

export class ShotgunEffect extends BulletEffect {
  get name() {
    return 'SG'
  }
  applyEffect(bullets: Bullet[]): Bullet[] {
    const ctor1 = Object.getPrototypeOf(bullets[0]).constructor as new (...args: any) => Bullet
    const newBullet1 = Reflect.construct<any, Bullet>(ctor1, [{
      scene: bullets[0].scene,
      position: bullets[0].position.clone().translate(0, 4),
      direction: bullets[0].direction.clone().rotateByDegree(13),
      speed: bullets[0].speed.clone().rotateByDegree(13),
      color: bullets[0].color,
      enemys: bullets[0].enemys,
      damage: bullets[0].damage,
      force: bullets[0].force
    }])

    const lastBullet = bullets[bullets.length - 1]
    const ctor2 = Object.getPrototypeOf(lastBullet).constructor as new (...args: any) => Bullet
    const newBullet2 = Reflect.construct<any, Bullet>(ctor2, [{
      scene: lastBullet.scene,
      position: lastBullet.position.clone().translate(0, -4),
      direction: lastBullet.direction.clone().rotateByDegree(-13),
      speed: lastBullet.speed.clone().rotateByDegree(-13),
      color: lastBullet.color,
      enemys: lastBullet.enemys,
      damage: lastBullet.damage,
      force: lastBullet.force
    }])
    return [newBullet1, ...bullets, newBullet2]
  }
}