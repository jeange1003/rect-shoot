import { AttributeType } from '../base-types/attribute-type';
import { BaseObject } from './base-object';
import { Bullet } from './bullet';
import { context } from '../global/context';
import { BuffEffect } from '../effects/buff-effect';
import { Speed } from '../base-types/speed';
import { KeyboardStatus } from '../keyboard/keyboard-status';
import { Area } from '../base-types/area';
import { Scene } from '../scene';
import { Position } from '../base-types/position';
import { Size } from '../base-types/size';
import { Direction } from '../base-types/direction';
import { Attribute } from '../base-types/attribute';

export class Rect extends BaseObject {
  _damage!: number;
  _shootSpeed!: number;
  _speed!: Speed;
  color: string;
  cooldown: number;
  enemys: Rect[];
  hp: number;
  isDead: boolean = false;
  keyboardStatus: KeyboardStatus;
  maxHp: number;
  restrictToArea: Area;
  effects: BuffEffect[] = []
  constructor(params: {
    scene: Scene,
    position: Position,
    size: Size,
    direction: Direction,
    keyboardStatus: KeyboardStatus,
    color: string,
    speed: Speed,
    hp: number,
    maxHp: number,
    damage: number,
    shootSpeed: number,
    restrictToArea: Area,
    enemys?: Rect[]
  }) {
    super({
      scene: params.scene,
      position: params.position,
      size: params.size,
      direction: params.direction
    })
    this.keyboardStatus = params.keyboardStatus
    this.color = params.color
    this.speed = params.speed
    this.cooldown = 0
    this.hp = params.hp
    this.maxHp = params.maxHp
    this.damage = params.damage
    this.shootSpeed = params.shootSpeed
    this.restrictToArea = params.restrictToArea
    this.enemys = params.enemys || []
  }
  get speed() {
    return this.applyEffect(AttributeType.Speed, this._speed)
  }
  set speed(value) {
    this._speed = value
  }
  get damage() {
    return this.applyEffect(AttributeType.Damage, this._damage)
  }
  set damage(value) {
    this._damage = value
  }
  get shootSpeed() {
    return this.applyEffect(AttributeType.ShootSpeed, this._shootSpeed)
  }
  set shootSpeed(value) {
    this._shootSpeed = value
  }
  addEffect(effect: BuffEffect) {
    this.effects.push(effect)
  }
  removeEffect(effect: BuffEffect) {
    this.effects = this.effects.filter(e => e !== effect)
  }
  applyEffect(attributeType: AttributeType, attribute: Attribute) {
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
      newPosition.x = this.position.x - this.speed.x
    } else if (this.keyboardStatus.isRightPressed) {
      newPosition.x = this.position.x + this.speed.x
    }

    if (this.keyboardStatus.isUpPressed) {
      newPosition.y = this.position.y - this.speed.y
    } else if (this.keyboardStatus.isDownPressed) {
      newPosition.y = this.position.y + this.speed.y
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
    const bullet = new Bullet({
      scene: this.scene,
      position: new Position(
        this.position.x + this.direction.x * this.size.width + this.direction.x * 20,
        this.position.y + this.direction.y * this.size.height + this.direction.y * 20
      ),
      speed: new Speed(
        this.direction.x * 15,
        this.direction.y * 15
      ),
      color: this.color,
      enemys: this.enemys,
      damage: this.damage
    })
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
  addEnemy(enemy: Rect) {
    this.enemys.push(enemy)
  }
  removeEnemy(enemy: Rect) {
    this.enemys = this.enemys.filter((e: Rect) => e !== enemy)
  }
  hurt(damage: number) {
    this.hp -= damage
    if (this.hp <= 0) {
      this.isDead = true
      this.enemys.forEach((e: Rect) => e.removeEnemy(this))
    }
  }
}