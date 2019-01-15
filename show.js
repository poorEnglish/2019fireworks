import utils from './utils/utils'
import drawMultiNum from './components/number'
import Firework from './components/firewoks'
let ctx = utils.getContext('#canvas');

//缓存canvas

let cacheCanvas=utils.getCacheCanvas(800,800);
let cacheContext=utils.getContext(cacheCanvas);


let father={
  points:[]
};
// drawMultiNum(2019,father);

function drawNum(context,father) {
  window.requestAnimationFrame(() => {
    context.clearRect(0, 0, 800, 800);
    // size 小于零的火花去掉
    father.points = father.points.filter(item => item.size > 0);
    if (father.points.length > 0) {
      father.points.forEach(s => {
        s.changeState().render(context);
      })
      drawNum(context,father);
    } else {
      console.log('end');
    }
  })
}

// drawNum(ctx,father);

// let timer=setTimeout(()=>{
//   console.log(father);
//   drawNum(ctx,father);
//   clearTimeout(timer);
// },0)






function drawFireWork(context){
  let firewok=new Firework({x:100,y:500},{x:200,y:100},'#f8b1a9',2.5);
  draw(context);
  function draw(context){
    let points =father.points;
    let res=firewok.changeState().getSparks();
    points=points.concat(res);
    father.points=points.filter(item=>{
      return item.size>0;
    });
    if(points.length>0){
      points.forEach(item=>{
        item.changeState().render(context)
      })
      ctx.drawImage(cacheCanvas, 0, 0, 800, 800);
      window.requestAnimationFrame(()=>{
        context.clearRect(0, 0, 800, 800);
        context.fillStyle='black';
        context.fillRect(0,0,800,800);
        draw(context)
      })
    }else{
      console.log('end');
    }
  }
}

drawFireWork(cacheContext);