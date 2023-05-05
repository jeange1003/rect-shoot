import { Position } from "../base-types/position.js";

export abstract class Panel {
  position: Position
  constructor(params: { position: Position }) {
    this.position = params.position
  }
  abstract update(): void
}