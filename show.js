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
let firewoks=[];
let width=700, height=400;
let aniId='',addId;



drawMultiNum(2019,father);
firewoks.push(new Firework({x:100,y:500},{x:200,y:100},'#f8b1a9',3));
drawFireWork(cacheContext);


function drawFireWork(context){  
  addId=setInterval(addFirework,500);
  draw(context);
  function draw(context){
    father.points= getPointsByFireWorks(firewoks,father);
    if(father.points.length>0 ){
      father.points.forEach(item=>{
        item.changeState().render(context)
      })
      context.stroke();
      ctx.drawImage(cacheCanvas, 0, 0, 800, 800);
      aniId=window.requestAnimationFrame(()=>{
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
 if(firewoks.length>5) return; 
 firewoks.push(new Firework(bottom,top,colors[Math.floor(Math.random()*colors.length)],2));
}

document.querySelector('button').addEventListener('click',(e)=>{
  if(aniId){
    window.cancelAnimationFrame(aniId);
    clearInterval(addId||'');
    aniId='';
    e.target.innerText='开始'
  }else{
    drawFireWork(cacheContext);
    e.target.innerText='暂停'
  }
})



