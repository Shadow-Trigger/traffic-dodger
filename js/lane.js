export class LaneManager {
  constructor(count, width) {
    this.count = count;
    this.laneWidth = width / count;
  }

  getLaneX(index) {
    return index * this.laneWidth + this.laneWidth / 2;
  }
}

