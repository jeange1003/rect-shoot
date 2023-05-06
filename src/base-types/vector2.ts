export class Vector2 {
  _x: number
  _y: number
  constructor(x: number, y: number) {
    if (isNaN(x) || isNaN(y)) {
      throw new Error('invalid x y param')
    }
    this._x = x
    this._y = y
  }
  get x() {
    return this._x
  }
  set x(value) {
    if (isNaN(value)) {
      debugger
    }
    this._x = value
  }
  get y() {
    return this._y
  }
  set y(v) {
    if (isNaN(v)) {
      debugger
    }
    this._y = v
  }
  get isFirstQuadrant() {
    return this.x > 0 && this.y > 0
  }
  get isSecondQuadrant() {
    return this.x < 0 && this.y > 0
  }
  get isThirdQuadrant() {
    return this.x < 0 && this.y < 0
  }
  get isForthQuadrant() {
    return this.x > 0 && this.y < 0
  }
  get radian(): number {
    if (this.x === 0 && this.y === 0) {
      throw new Error('Illigal direction')
    }
    if (this.x === 0) {
      if (this.y > 0) {
        return Math.PI / 2
      } else {// this.y < 0
        return Math.PI / 2 * 3
      }
    }
    if (this.y === 0) {
      if (this.x > 0) {
        return 0
      } else {
        return Math.PI
      }
    }
    if (this.isFirstQuadrant) {
      return Math.atan(this.y / this.x)
    }
    if (this.isSecondQuadrant || this.isThirdQuadrant) {
      return Math.atan(this.y / this.x) + Math.PI
    }
    if (this.isForthQuadrant) {
      return Math.atan(this.y / this.x) + Math.PI * 2
    }
    throw new Error('Unknown direction')
  }
  get degree(): number {
    return this.radian / Math.PI * 180
  }
  get length(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }
  rotateByRadian(radian: number) {
    const newRadian = this.radian + radian
    const length = this.length
    this.x = Math.cos(newRadian) * length
    this.y = Math.sin(newRadian) * length
    return this
  }
  rotateByDegree(degree: number) {
    const radian = degree / 180 * Math.PI
    return this.rotateByRadian(radian)
  }
  translate(dx: number, dy: number) {
    this.x += dx
    this.y += dy
    return this
  }
  clone() {
    return new Vector2(this.x, this.y)
  }
  unit() {
    const length = this.length
    if (length === 0) {
      return new Vector2(0, 0)
    }
    return new Vector2(this.x / length, this.y / length)
  }
  substract(vector: Vector2) {
    return new Vector2(this.x - vector.x, this.y - vector.y)
  }
  add(vector: Vector2) {
    return new Vector2(this.x + vector.x, this.y + vector.y)
  }
}