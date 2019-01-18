// const INTERVAL = 3; //每隔三次计数才返回要渲染的point
const A = 100;      //考虑到空气阻力，重力加速度设为16
import Point from './point';
import RectPoint from './rectPoints'
import {detaTime,CIRCLE,ANGLES,SPEED} from '../../constants'
import utils from '../../utils/utils'
export default class Firework {
  constructor(position, destination, color, size) {
    this.position = position;
    this.destination = destination;
    this.color = color;
    this.sparks = [];
    this.step = this.getStep();
    this.boomState = 0; // 0:未爆炸 1:已爆炸 2:结束
    this.count = 0;
    this.size = size;
    this.y_v=A * detaTime
    this.deta_y_d = parseFloat((1 / 2 * A * Math.pow(detaTime, 2)).toFixed(2));
    this.changeSparkState=this.changeSparkState.bind(this);
  }

  /**
   * 三个状态分别做不同的事情
   */
  changeState() {
    let { position, destination } = this;
    if (position.y > destination.y) {
      this.position = {
        x: this.position.x + this.step.x,
        y: this.position.y + this.step.y
      }
    } else if (this.boomState === 0) {
      this.createSparks();
      this.boomState = 1;
      this.size=4;
    } else {
      this.size -= 0.05;
      if ( this.size <=0  && this.boomState==1) {
        this.boomState = 2;
        return this;
      }
      this.sparks.forEach(this.changeSparkState);
    }
    return this;
  }

  getSparks() {
    let res = [];
    this.count += 1;
    //间隔三次新建一波点
    // if(this.count%INTERVAL==1){
    if (this.boomState == 0) {
      res.push(new Point(this.position, this.color, this.size))
    } else if (this.boomState == 1) {
      res = this.sparks.map(item => new RectPoint(item.position, this.color, this.size));
      // console.log(res);
    }
    // }
    return res;
  }

  changeSparkState(item) {
    let {
      position,
      speed,
      size,
    } = item;

    let y_d = speed.y * detaTime + this.deta_y_d;
    let x_d = speed.x * detaTime;
    item.position = {
      x: position.x + x_d,
      y: position.y + y_d
    }

    item.speed = {
      x: speed.x > 0 ? speed.x - 0.01 : speed.x + 0.01,
      y: speed.y + this.y_v
    }
    item.size = size - 0.003;
  }

  //暂定设为需要2秒到达地点
  getStep() {
    let { destination, position } = this;
    let x_d = destination.x - position.x;
    let y_d = destination.y - position.y;
    return {
      x: x_d / 90,
      y: y_d / 90
    }
  }

  createSparks() {
    // let sp=SPEED*SPEED;
    let {sinAngles,cosAngles}=ANGLES;
    for (let j = 0; j < CIRCLE; j++) {
      let fenmu=(j+1)/CIRCLE.toFixed(2);
      for (let i = 0; i < sinAngles.length; i++) {
        // let x_s=SPEED*utils.randomArea(0,1,2,true);
        // let y_s=Math.sqrt(sp-Math.pow(x_s,2));
        this.sparks.push({
          speed: {
            x: sinAngles[i]*fenmu*utils.randomArea(0.8,1.2),
            y: cosAngles[i]*fenmu*utils.randomArea(0.8,1.2)
            // x:x_s*fenmu,
            // y:(Math.random()>0.5?y_s:-y_s)*fenmu
          },
          position: this.position,
          // exitCount: rand * ct
        });
      }
    }
  }
}