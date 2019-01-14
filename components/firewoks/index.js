const INTERVAL = 3; //每隔三次计数才返回要渲染的point
const DURATION = 50 / 3 //这个是渲染间隔时间
const SPARK_NUM = 80 //当作烟花炸开的数量
const A = 12;      //考虑到空气阻力，重力加速度设为8
const SPEED = 50;  //炸开后的基准速度
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
      this.size=3;
    } else {
      this.size -= 0.05;
      let sparks = this.sparks.filter(item => {
        return item.exitCount > this.count;
      })
      if (sparks.length == 0) {
        this.boomState = 2;
      }
      sparks.forEach(this.changeSparkState);
      this.sparks = sparks;
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
      console.log(res);
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

    let time = DURATION * 3 / 1000;
    let y_v = A * time;
    let y_d = speed.y * time + 1 / 2 * A * Math.pow(time, 2);
    let x_d = speed.x * time;
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
    let time = 2000;
    let x_d = destination.x - position.x;
    let y_d = destination.y - position.y;
    let t = time / DURATION;
    return {
      x: x_d / t,
      y: y_d / t
    }
  }

  createSparks() {
    let circle = 3;
    let sPC = SPARK_NUM / circle; //spark num per circle
    let perAngle = Math.PI / (sPC) * 2;
    let ct = 2500 / DURATION;
    for (let j = 0; j < circle; j++) {
      for (let i = 0; i < sPC; i++) {
        let rand = Math.random() / 5 + 0.9; //0.8-1.2
        let ancle = perAngle * i * rand;
        this.sparks.push({
          speed: {
            x: SPEED * Math.sin(ancle) / (j + 1),
            y: SPEED * Math.cos(ancle) / (j + 1)
          },
          position: this.position,
          exitCount: rand * ct
        })
      }
    }

  }

}