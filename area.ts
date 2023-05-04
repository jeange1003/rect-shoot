export class Area {
  x1: any;
  x2: any;
  y1: any;
  y2: any;
  constructor(params: any) {
    this.x1 = params.x1
    this.x2 = params.x2
    this.y1 = params.y1
    this.y2 = params.y2
  }
  isInArea(position: any) {
    return position.x > this.x1 && position.x < this.x2 && position.y > this.y1 && position.y < this.y2
  }
}