export default class Glass {
  constructor(beiginPoint) {
    this.size = Math.random().toFixed(1) / 2 + 0.5;
    this.beiginPoint = beiginPoint;
    this.width = 20;
    this.height = 200;
  }

  /**
   * 
   * @param {*} context 
   * @param {*} deviation 偏离值
   */
  draw(context, deviation) {
    let top = this.getTop(deviation);
    let cp = this.getCp(deviation);
    context.beginPath();
    this.drawLeftLine(context, cp, top)
    this.drawRightLine(context, cp, top);
    context.closePath();
    context.fill();
    context.stroke();
  }

  getCp(deviation) {
    let {
      x,
      y
    } = this.beiginPoint;
    // let rand = Math.random().toFixed(1) / 2 + 0.5;
    return {
      x: x + 5 * this.size,
      y: y - deviation * this.size,
    }
  }

  getTop(deviation) {
    let {
      x,
      y
    } = this.beiginPoint;
    return {
      y: y - this.height * this.size,
      x: x - deviation * this.size,
    };
  }

  drawLeftLine(context, cp, top) {
    // context.beginPath();
    let {
      x,
      y
    } = this.beiginPoint;
    context.moveTo(x, y);
    context.quadraticCurveTo(cp.x, cp.y, top.x, top.y);
    // context.stroke();
  }

  drawRightLine(context, cp, top) {
    // context.beginPath();
    let {
      x,
      y
    } = this.beiginPoint;
    // context.moveTo(x+this.width*this.size,y);
    // context.quadraticCurveTo(cp.x+this.width*this.size, cp.y, top.x, top.y);
    // context.moveTo(top.x,top.y)

    context.quadraticCurveTo(cp.x + this.width * this.size, cp.y, x + this.width * this.size, y);
    // context.stroke();
  }
}