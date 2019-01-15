/**
 * 数字点，包括到炸裂到下坠消失
 */
import utils from '../utils/utils'
export default class Spark {

  render(context) {
    context.fillStyle = this.color;
    let {
      x,
      y
    } = this.position;
    context.strokeStyle = this.color;
    // context.moveTo(this.position.x, this.position.y);
    context.beginPath();
    if (this.size > 0) context.arc(x, y, this.size, 0, Math.PI * 2);
    context.fill();
    context.closePath();
    context.stroke();
  }

  changeAlpha(num) {
    if (this.color.startsWith('#')) {
      this.color = utils.colorTransfer(this.color);
    } else {
      this.color = this.color.replace(/,([0-9\.]+)\)/, (...args) => {
        return `,${args[1]-num})`
      })
    }
  }


}