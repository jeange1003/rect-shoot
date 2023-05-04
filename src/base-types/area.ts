import { Position } from "./position";

export class Area {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  constructor(params: { x1: number, x2: number, y1: number, y2: number }) {
    this.x1 = params.x1
    this.x2 = params.x2
    this.y1 = params.y1
    this.y2 = params.y2
  }
  isInArea(position: Position) {
    return position.x > this.x1 && position.x < this.x2 && position.y > this.y1 && position.y < this.y2
  }
}