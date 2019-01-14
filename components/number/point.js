import Point from '../points'
export default class NumberPoint extends Point{

 /**
   * 
   * @param {*} position 初始位置
   * @param {*} destination 终点
   * @param {*} color 颜色
   * @param {*} size 大小
   * @param {*} duration 跑到终点的时间
   * @param {*} delay 到终点后的停留时间
   * @param startSize 初始大小
   * @param narrow  缩减量
   */
  constructor(position, destination, color, size, duration, delay, startSize = 0.1, narrow = 0.05) {
    super();
    this.position = position;
    this.destination = destination;
    this.color = color;
    this.finalSize = size;
    this.size = startSize;
    this.duration = duration;
    this.delay = delay;
    this.narrow = narrow;
    this.count = 0;
    this.moveCount = duration * 50 / 3; //60/1000=3/50
    this.stopCount = (duration + delay) * 50 / 3;
    this.step = this.getStep(duration, position, destination)
  }

  changeState() {
    this.count++;
    if (this.count < this.moveCount) {
      this.position = {
        x: this.position.x + this.step.x,
        y: this.position.y + this.step.y,
      }
      if (this.size < this.finalSize) {
        this.size = this.size + 0.3;
      }
    } else if (this.count > this.stopCount) {
      this.position.y += 1;
      this.size -= this.narrow;
      this.changeAlpha();
    }
    return this;
  }

  getStep(duration, fp, lp) {
    return {
      x: (lp.x - fp.x) / duration / 50 * 3,
      y: (lp.y - fp.y) / 50 / duration * 3
    }
  }
}