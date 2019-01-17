import {
  GAP,
  NUMS,
  OFFSET
} from '../constants'

export default {
  // string|canvas -> context
  getContext(name) {
    if (!name) return null;
    if (typeof name == 'string') return this.getCanvas(name).getContext('2d');
    return name.getContext('2d');
  },

  // string -> canvas
  getCanvas(name) {
    return document.querySelector(name)
  },
  // (num,num,num,num)->ctx->ctx
  drawRect(...args) {
    return (ctx) => {
      ctx.strokeRect(...args);
      return ctx
    }
  },
  // (num,num)-> canvas
  getCacheCanvas(width, height) {
    let cacehCanvas = document.createElement('canvas');
    cacehCanvas.width = width;
    cacehCanvas.height = height;
    return cacehCanvas;
  },

  getPointsPositions(startPosition,num,lineNum){
    let guns=NUMS.get(num);
    let lines={
      row:[],
      col:[]
    }
    let {x, y}=startPosition;
    for(let i=0;i<7;i++){
      lines.row.push({
        x:x+i*(GAP/6)-GAP/2,
        y
      });
      lines.col.push({
        x,
        y:y+i*(GAP/6)-GAP/2
      })
    }
    let func = lineNum==1?getSingleOffsetedPoints:getDoubleOffsetPoints
    return guns.reduce((p,c)=>{
      return p.concat(func(c))
    },[])

    function getSingleOffsetedPoints(num){
      let settings=OFFSET.get(num);
      return getPoints(settings);
    }

    function getDoubleOffsetPoints(num){
      let settings = OFFSET.get(num);
      return getPoints(settings,{x:0,y:0,delay:0}).concat(getPoints(settings,{x:0,y:16.7,delay:-0.17},{x:16.7,y:0,delay:0}))
    }

    function getPoints(settings,rowOffset={x:0,y:0,delay:0},colOffset={x:0,y:0,delay:0}){
      let {lineName,offset,extraDelay,hand} = settings;
      let {x,y,delay}=lineName=='row'?rowOffset:colOffset;
      x=hand==='right'?-x:x;
      return lines[lineName].map((item,index)=>{
        return {
          x:item.x+offset.x+x,
          y:item.y+offset.y+y,
          delay:extraDelay[index]+delay
        }
      })
    } 
  },
  /**
   * 
   * @param {*} color rgb转#，或者#转rgb
   */
  colorTransfer(color){
    if(!color) return null;
    if(color.startsWith('#')){
      let [f,s,t]=[color.slice(1,3),color.slice(3,5),color.slice(-2)];
      return `rgba(${parseInt(f,16)},${parseInt(s,16)},${parseInt(t,16)},1)`
    }else if(color.startsWith('rgb')){
      return color.match(/\((.+?)\)/)[1].split(',').slice(0,3).reduce((p,c)=>{
        let num=parseInt(c);
        return p+num.toString(16).padStart(2,'0')
      },'#')
    }else {
      return null;
    }
  },

  randomArea(min,max,fix=2){
    return parseFloat((min+Math.random()*(max-min)).toFixed(fix));
  }
}