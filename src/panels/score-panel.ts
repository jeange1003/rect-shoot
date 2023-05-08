import { Position } from "../base-types/position.js";
import { GameData } from "../game-data.js";
import { canvas } from "../global/canvas.js";
import { context } from "../global/context.js";
import { Panel } from "./panel.js";

export class ScorePanel extends Panel {
  gameData: GameData
  constructor(params: { gameData: GameData, position: Position }) {
    super(params)
    this.gameData = params.gameData
  }
  update() {
    this.render()
  }
  render() {
    context.save()
    context.fillStyle = 'red';
    context.font = '16px Arial'
    context.fillText(`Score: ${this.gameData.score}`, this.position.x, this.position.y)
    context.fillText(`Level: ${this.gameData.level}`, this.position.x, this.position.y + 16)
    context.restore()
  }
}