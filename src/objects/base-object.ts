import { Direction } from "../base-types/direction.js";
import { Position } from "../base-types/position.js";
import { Size } from "../base-types/size.js";
import { Scene } from "../scene.js";

export abstract class BaseObject {
  direction: Direction;
  position: Position;
  scene: Scene;
  size: Size;
  isDead: boolean = false
  constructor(params: { scene: Scene, position: Position, size: Size, direction: Direction }) {
    this.scene = params.scene
    this.position = params.position
    this.size = params.size
    this.direction = params.direction
  }

  abstract update(): void

  abstract render(): void
}