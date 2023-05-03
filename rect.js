import { AttributeType } from './attribute-type.js';
import { BaseObject } from './base-object.js';
import { Bullet } from './bullet.js';
import { context } from './context.js';
import { Position } from './position.js';
export class Rect extends BaseObject {
  effects = []
  constructor(params, scene, position, keyboardStatus, color, direction, damage, shootSpeed, restrictToArea) {
    super({
      scene: params.scene,
      position: params.position,
      size: params.size || { width: 100, height: 100 },
      direction: params.direction
    })
    this.keyboardStatus = params.keyboardStatus
    this.color = params.color
    this.speed = params.speed || { x: 10, y: 10 }
    this.cooldown = 0
    this.hp = params.hp || 100
    this.maxHp = params.maxHp || 100
    this.damage = params.damage
    this.shootSpeed = params.shootSpeed
    this.restrictToArea = params.restrictToArea
    this.enemys = params.enemys || []
  }
  get speed() {
    return this.applyEffect(AttributeType.Speed, this._speed)
    // if (this.effects.length) {
    //   let speed = this._speed
    //   for (let effect of effects) {
    //     speed = effect.applyEffect(AttributeType.Speed, speed)
    //   }
    //   return speed
    // }
    // return this._speed
  }
  set speed(value) {
    this._speed = value
  }
  get damage() {
    return this.applyEffect(AttributeType.Damage, this._damage)
    // return this._damage
  }
  set damage(value) {
    this._damage = value
  }
  get shootSpeed() {
    return this.applyEffect(AttributeType.ShootSpeed, this._shootSpeed)
    // return this._shootSpeed
  }
  set shootSpeed(value) {
    this._shootSpeed = value
  }
  addEffect(effect) {
    this.effects.push(effect)
  }
  removeEffect(effect) {
    this.effects = this.effects.filter(e => e !== effect)
  }
  applyEffect(attributeType, attribute) {
    if (this.effects.length) {
      let _attribute = attribute
      for (let effect of this.effects) {
        _attribute = effect.applyEffect(attributeType, _attribute)
      }
      return _attribute
    }
    return attribute
  }
  update() {
    const newPosition = { ...this.position }
    if (this.keyboardStatus.isLeftPressed) {
      // if (this.position.x - this.size.width / 2 > 0) {
      newPosition.x = this.position.x - this.speed.x
      // }
    } else if (this.keyboardStatus.isRightPressed) {
      // if (this.position.x + this.size.width / 2 < canvas.width) {
      newPosition.x = this.position.x + this.speed.x
      // }
    }

    if (this.keyboardStatus.isUpPressed) {
      // if (this.position.y - this.size.height / 2 > 0) {
      newPosition.y = this.position.y - this.speed.y
      // }
    } else if (this.keyboardStatus.isDownPressed) {
      // if (this.position.y + this.size.height / 2 < canvas.height) {
      newPosition.y = this.position.y + this.speed.y
      // }
    }
    if (this.restrictToArea.isInArea(newPosition)) {
      this.position = newPosition
    }
    if (this.cooldown > 0) {
      this.cooldown--
    }
    if (this.keyboardStatus.isFirePressed && this.cooldown <= 0) {
      this.fire()
      this.cooldown = Math.floor(60 / this.shootSpeed)
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
    }, this.color, this.enemys, this.damage)
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
    context.rect(this.position.x - this.size.width / 2, this.position.y - this.size.height / 2 - 15, this.size.width * (this.hp / this.maxHp), 5);
    context.fill();
  }
  addEnemy(enemy) {
    this.enemys.push(enemy)
  }
  removeEnemy(enemy) {
    this.enemys = this.enemys.filter(e => e !== enemy)
  }
  hurt(damage) {
    this.hp -= damage
    if (this.hp <= 0) {
      // this.scene.removeObject(this)
      this.isDead = true
      this.enemys.forEach(e => e.removeEnemy(this))
    }
  }
  destroy() {

  }
}