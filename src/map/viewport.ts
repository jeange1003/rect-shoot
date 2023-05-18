import { Position } from "../base-types/position.js";
import { Size } from "../base-types/size.js";
import { BaseObject } from "../objects/base-object.js";
import { Rect } from "../objects/rect.js";

export class Viewport {
  center: Position
  size: Size
  player1Rect?: Rect
  player2Rect?: Rect
  constructor(params: {
    leftTopPosition: Position,
    size: Size
  }) {
    this.center = params.leftTopPosition;
    this.size = params.size;
  }

  isObjectOutOfViewport(object: BaseObject) {
    const halfWidth = this.size.width / 2
    const halfHeight = this.size.height / 2
    return object.position.x < this.center.x - halfWidth
      || object.position.y < this.center.y - halfHeight
      || object.position.x > this.center.x + halfWidth
      || object.position.y > this.center.y + halfHeight
  }

  getPositionInViewport(position: Position) {
    return new Position(position.x - (this.center.x - this.size.width / 2), position.y - (this.center.y - this.size.height / 2))
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

  update() {
    this.center = this.getCenterOfPlayers()
  }
}