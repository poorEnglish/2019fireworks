import FirePoints from './point'
/**
 * 烟花的点只需要在原位置变小变淡就可以
 */
export default class RectPoints extends FirePoints {
  
  render(context){
    let {
      x,
      y
    } = this.position;
    context.fillStyle = this.color;
    // context.beginPath();
    if (this.size > 0) {
      context.fillRect(x, y, this.size, this.size * 1.5);
    }
    // context.closePath();
  }

}