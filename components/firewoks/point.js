
import Point from '../points'
/**
 * 烟花的点只需要在原位置变小变淡就可以
 */
export default class FirePoints extends Point{
  constructor(position, color, size, narrow = 0.1){
    super();
    this.position=position;
    this.color=color;
    this.size=size;
    this.narrow=narrow;
  };
  
  changeState() {
      // this.position.y += 1;
    this.size -= this.narrow;
    this.changeAlpha(0.05);
    return this;
  }
}