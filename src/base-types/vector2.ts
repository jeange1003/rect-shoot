export class Vector2 {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
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
}