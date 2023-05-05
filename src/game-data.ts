import { Settings } from "./settings.js"

export class GameData {
  score = 0
  settings: Settings
  level = 1
  constructor(params: { settings: Settings }) {
    this.settings = params.settings
  }
  addScore(deltaScore: number) {
    this.score = Math.round(this.score + deltaScore)
    this.setLevelByScore()
  }
  setLevelByScore() {
    this.level = this.settings.levelScore.length + 1
    for (let i = 0; i < this.settings.levelScore.length - 1; i++) {
      const scoreLow = this.settings.levelScore[i]
      const scoreHigh = this.settings.levelScore[i + 1]
      if (this.score >= scoreLow && this.score < scoreHigh) {
        this.level = i + 1
      }
    }
  }
}