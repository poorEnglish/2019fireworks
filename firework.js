import Points from './components/points'
import utils from './utils/utils'
import {
  COLORS
} from './constants'


let context = utils.getContext('#canvas');

// let s1=new Points({x:250,y:400},{x:100,y:200},'red',10,2,2);
let startPoint = {
  x: 250,
  y: 200
}
let colors = COLORS.warm;
let len = colors.length;




function drawNumber(startPoint, number, lineNum) {
  let points = utils.getPointsPositions(startPoint, number, lineNum);
  let numPoints = points.map(endPoint => {
    return new Points(startPoint, endPoint, colors[Math.floor(Math.random() * len)], 6, 2, 2 + endPoint.delay * 2);
  })

  function draw() {
    window.requestAnimationFrame(() => {
      context.clearRect(0, 0, 500, 500);
      // size 小于零的火花去掉
      numPoints = numPoints.filter(item => item.size > 0);
      if (numPoints.length > 0) {
        numPoints.forEach(s => {
          s.changeState().render(context);
        })
        draw();
      } else {
        console.log('end');
      }
    })
  }
  draw();
}

// drawNumber(startPoint,6,2)

function drawFireworks(){
  
}