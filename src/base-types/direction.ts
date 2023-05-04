type DirectionValues = 1 | 0 | -1
export class Direction {
  x: DirectionValues
  y: DirectionValues
  constructor(x: DirectionValues, y: DirectionValues) {
    this.x = x
    this.y = y
  }
}