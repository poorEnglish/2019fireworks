import Points from './point'
import utils from '../../utils/utils'
import {
  COLORS
} from '../../constants'

// let s1=new Points({x:250,y:400},{x:100,y:200},'red',10,2,2);

let colors = COLORS.warm;
let len = colors.length;
let startx=0;
const gap=[150,150,190,110];

function getNumberPoint(startPoint, number, lineNum,duration=2,delay=2) {
  let points = utils.getPointsPositions(startPoint, number, lineNum);
  let numPoints = points.map(endPoint => {
    return new Points(startPoint, endPoint, colors[Math.floor(Math.random() * len)], 6, duration, delay + endPoint.delay * 2);
  })
  return numPoints;
}

function drawMultiNum(num,father){
  let numbers=num.toString().split('');

  numbers.forEach((item,index)=>{
    setTimeout(()=>{
      startx+=gap[index];
      father.points=father.points.concat(getNumberPoint({x:startx,y:200},parseInt(item),2,2,8));
    },500*index)
  })
}

export default drawMultiNum;