import utils from './utils/utils'
import getNumberPoint from './components/number'
import Firework from './components/firewoks'
let context = utils.getContext('#canvas');

// let points=getNumberPoint({x:200,y:200},4,2);

function drawNum(context,points) {
  window.requestAnimationFrame(() => {
    context.clearRect(0, 0, 500, 500);
    // size 小于零的火花去掉
    points = points.filter(item => item.size > 0);
    if (points.length > 0) {
      points.forEach(s => {
        s.changeState().render(context);
      })
      drawNum(context,points);
    } else {
      console.log('end');
    }
  })
}
// drawNum(context,points);
let points=[];

function drawFireWork(context){
  let firewok=new Firework({x:100,y:500},{x:200,y:100},'#c85179',5);
  draw(context);
  function draw(context){
    let res=firewok.changeState().getSparks();
    points=points.concat(res);
    points=points.filter(item=>{
      return item.size>0;
    });
    // console.log(points);
    points.forEach(item=>{
      item.changeState().render(context)
    })
    window.requestAnimationFrame(()=>{
      context.clearRect(0, 0, 500, 500);
      draw(context)
    })
  }
}

drawFireWork(context);