// const INTERVAL = 3; //每隔三次计数才返回要渲染的point
const DURATION = 50 / 3 //这个是渲染间隔时间
const SPARK_NUM = 70 //当作烟花炸开的数量
const A = 16;      //考虑到空气阻力，重力加速度设为8
const SPEED = 60;  //炸开后的基准速度
const circle = 3;  //炸开的圈数
import Point from './point'
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
    } else if (position.y < destination.y && !this.boomState) {
      this.createSparks();
      this.boomState = 1;
      this.size=2.8;
    } else {
      this.size -= 0.05;
      // let sparks = this.sparks.filter(item => {
      //   return item.size>0
      // })
      if (this.sparks.length == 0) {
        this.boomState = 2;
      }
      this.sparks.forEach(this.changeSparkState);
      // this.sparks=sparks;
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
      res = this.sparks.map(item => new Point(item.position, this.color, this.size));
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

    let time = parseFloat((DURATION * 3 / 1000).toFixed(2));
    let y_v = A * time;
    let y_d = parseFloat((speed.y * time + 1 / 2 * A * Math.pow(time, 2)).toFixed(2));
    let x_d = parseFloat((speed.x * time).toFixed(2));
    item.position = {
      x: position.x + x_d,
      y: position.y + y_d
    }

    item.speed = {
      x: speed.x > 0 ? speed.x - 0.01 : speed.x + 0.01,
      y: speed.y + y_v
    }
    item.size = size - 0.005;
  }

  //暂定设为需要2秒到达地点
  getStep() {
    let { destination, position } = this;
    let time = 1200;
    let x_d = destination.x - position.x;
    let y_d = destination.y - position.y;
    let t = parseFloat((time / DURATION).toFixed(2));
    return {
      x: x_d / t,
      y: y_d / t
    }
  }

  createSparks() {
    let sPC = parseFloat((SPARK_NUM / circle).toFixed(2)); //spark num per circle
    let perAngle = parseFloat((Math.PI / (sPC) * 2).toFixed(2));
    let ct =parseFloat((2500 / DURATION).toFixed(2));
    for (let j = 0; j < circle; j++) {
      for (let i = 0; i < sPC; i++) {
        let rand =parseFloat((Math.random() / 5 + 0.9).toFixed(2)); //0.8-1.2 
        let ancle =parseFloat((perAngle * i * rand).toFixed(2));
        this.sparks.push({
          speed: {
            x: parseFloat((SPEED * Math.sin(ancle) / (j + 1)).toFixed(2)),
            y: parseFloat((SPEED * Math.cos(ancle) / (j + 1)).toFixed(2))
          },
          position: this.position,
          // exitCount: rand * ct
        });
      }
    }

  }

}