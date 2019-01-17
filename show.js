import utils from './utils/utils'
import drawMultiNum from './components/number'
import Firework from './components/firewoks'
import {COLORS} from './constants'
let ctx = utils.getContext('#canvas');
let colors=COLORS.warm;
//缓存canvas

let cacheCanvas=utils.getCacheCanvas(800,800);
let cacheContext=utils.getContext(cacheCanvas);


let father={
  points:[]
};
let firewoks=[]




drawMultiNum(2019,father);
firewoks.push(new Firework({x:100,y:500},{x:200,y:100},'#f8b1a9',3));
drawFireWork(cacheContext);
setInterval(addFirework,800)




function drawFireWork(context){  
  draw(context);
  function draw(context){
    father.points= getPointsByFireWorks(firewoks,father);
    if(father.points.length>0 ){
      father.points.forEach(item=>{
        item.changeState().render(context)
      })
      context.stroke();
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

function getPointsByFireWorks(firewoks,father){
  let newo = father.points;
  father.points = null;
  let points=firewoks.reduce((p,c)=>{
    return p.concat(c.changeState().getSparks())
  },newo);
  return points.filter(item=>{
    return item.size>0;
  });
}

let width=700, height=400;

function addFirework(){
  let bottom={
    x:width* Math.round(Math.random()*100)/100,
    y:800
  }
  let top={
    x:width*Math.round(Math.random()*100)/100,
    y:height*Math.round(Math.random()*100)/200+50
  }
 firewoks=firewoks.filter(item=>item.boomState<2);   
 firewoks.push(new Firework(bottom,top,colors[Math.floor(Math.random()*colors.length)],3));
}





