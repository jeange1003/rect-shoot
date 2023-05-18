import { Direction } from "../base-types/direction.js";
import { Position } from "../base-types/position.js";
import { Size } from "../base-types/size.js";
import { Viewport } from "../map/viewport.js";
import { Scene } from "../scene.js";

export abstract class BaseObject {
  direction: Direction;
  position: Position;
  scene: Scene;
  size: Size;
  isDead: boolean = false
  viewport: Viewport
  constructor(params: { scene: Scene, position: Position, size: Size, direction: Direction, viewport: Viewport }) {
    this.scene = params.scene
    this.position = params.position
    this.size = params.size
    this.direction = params.direction
    this.viewport = params.viewport
  }

  abstract update(): void

  abstract render(): void
}