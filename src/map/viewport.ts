import { Position } from "../base-types/position.js";
import { Size } from "../base-types/size.js";
import { BaseObject } from "../objects/base-object.js";

export class Viewport {
  leftTopPosition: Position
  size: Size
  constructor(params: {
    leftTopPosition: Position,
    size: Size
  }) {
    this.leftTopPosition = params.leftTopPosition;
    this.size = params.size;
  }

  isObjectOutOfViewport(object: BaseObject) {
    return object.position.x < this.leftTopPosition.x
      || object.position.y < this.leftTopPosition.y
      || object.position.x > this.leftTopPosition.x + this.size.width
      || object.position.y > this.leftTopPosition.y + this.size.height
  }

  getPositionInViewport(position: Position) {
    return new Position(position.x - this.leftTopPosition.x, position.y - this.leftTopPosition.y)
  }
}