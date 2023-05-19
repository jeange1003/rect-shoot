import { Position } from "../base-types/position.js";
import { Size } from "../base-types/size.js";
import { Vector2 } from "../base-types/vector2.js";
import { BaseObject } from "../objects/base-object.js";
import { Rect } from "../objects/rect.js";

export class Viewport {
  center: Position
  originSize: Size
  player1Rect?: Rect
  player2Rect?: Rect
  scale = 1
  constructor(params: {
    center: Position,
    size: Size
  }) {
    this.center = params.center;
    this.originSize = params.size;
  }

  get size(): Size {
    return new Size(this.originSize.width * this.scale, this.originSize.height * this.scale)
  }

  isObjectOutOfViewport(object: BaseObject) {
    const halfWidth = this.originSize.width / 2
    const halfHeight = this.originSize.height / 2
    return object.position.x < this.center.x - halfWidth * this.scale
      || object.position.y < this.center.y - halfHeight * this.scale
      || object.position.x > this.center.x + halfWidth * this.scale
      || object.position.y > this.center.y + halfHeight * this.scale
  }

  getPositionInViewport(position: Position) {
    return new Position(
      (position.x - (this.center.x - this.originSize.width * this.scale / 2)),
      (position.y - (this.center.y - this.originSize.height * this.scale / 2)))
  }

  setPlayer1Rect(rect: Rect) {
    this.player1Rect = rect
  }

  setPlayer2Rect(rect: Rect) {
    this.player2Rect = rect
  }

  getCenterOfPlayers() {
    if (!this.player1Rect || !this.player2Rect) {
      return this.center
    }
    const position1 = this.player1Rect.position
    const position2 = this.player2Rect.position
    return new Position((position1.x + position2.x) / 2, (position1.y + position2.y) / 2)
  }

  getDiffDirectionOfPlayers() {
    if (!this.player1Rect || !this.player2Rect) {
      return this.center
    }
    const position1 = this.player1Rect.position
    const position2 = this.player2Rect.position
    return position1.substract(position2)
  }

  setScale(diffDirection: Vector2) {
    let widthScale = Math.abs(diffDirection.x) / (this.originSize.width - 200)
    let heightScale = Math.abs(diffDirection.y) / (this.originSize.height - 200)
    widthScale = widthScale > 1 ? widthScale : 1
    heightScale = heightScale > 1 ? heightScale : 1
    this.scale = widthScale > heightScale ? widthScale : heightScale
  }

  update() {
    this.center = this.getCenterOfPlayers()
    this.setScale(this.getDiffDirectionOfPlayers())
  }
}