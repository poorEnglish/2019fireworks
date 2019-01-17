
import Point from '../points'
/**
 * 烟花的点只需要在原位置变小变淡就可以
 */
export default class FirePoints extends Point {
  constructor(position, color, size, narrow = 0.1) {
    super();
    this.position = position;
    this.color = color;
    this.size = size;
    this.narrow = narrow;
  };

  changeState() {
    // this.position.y += 1;
    this.size -= this.narrow;
    this.changeAlpha(0.05);
    return this;
  }

  render(context) {
    context.fillStyle = this.color;
    let {
      x,
      y
    } = this.position;
    context.strokeStyle = this.color;
    // context.moveTo(this.position.x, this.position.y);
    // context.lineWidth=this.size;
    context.beginPath();
    if (this.size > 0) context.arc(x, y, this.size, 0, Math.PI * 2);
    context.fill();
    context.closePath();
  }
}