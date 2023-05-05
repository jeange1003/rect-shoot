export class Settings {
  // maxSpeed: number
  levelScore: number[]
  constructor(params: {
    // maxSpeed: number
  }) {
    // this.maxSpeed = params.maxSpeed
    this.levelScore = this.generateLevelScoreFibonacci([])
  }
  /**
   * fibonacci
   */
  generateLevelScoreFibonacci(levelScore: number[]): number[] {
    if (!levelScore || levelScore.length === 0) {
      return this.generateLevelScoreFibonacci([0, 10, 20])
    }
    if (levelScore.length > 100) {
      return levelScore
    }
    return this.generateLevelScoreFibonacci(levelScore.concat([levelScore[levelScore.length - 1] + levelScore[levelScore.length - 2]]))
  }
}