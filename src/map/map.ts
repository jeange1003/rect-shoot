import { Size } from "../base-types/size.js";
import { canvas } from "../global/canvas.js";
import { context } from "../global/context.js";
import { Viewport } from "./viewport.js";

export class GameMap {
  // tileSize = new Size(10, 10)
  // tileMap: string[][] = []
  viewport: Viewport
  pattern?: CanvasPattern
  constructor(params: { viewport: Viewport }) {
    this.viewport = params.viewport
    const img = new Image();

    img.src = "assets/images/map/background.jpg";
    // Only use the image after it's loaded
    img.onload = () => {
      const pattern = context.createPattern(img, "repeat") as CanvasPattern;
      this.pattern = pattern


    };
    // for (let x = -1000; x <= 1000; x++) {
    //   const column: string[] = []
    //   this.tileMap.push(column)
    //   for (let y = -1000; y <= 1000; y++) {
    //     column.push()
    //   }
    // }
  }
  update() {
    this.render()
  }
  render() {
    if (!this.pattern) {
      return
    }
    context.beginPath();
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix/DOMMatrix
    this.pattern.setTransform(new DOMMatrix([1, 0, 0, 1, -this.viewport.center.x, -this.viewport.center.y]))
    context.fillStyle = this.pattern;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
}