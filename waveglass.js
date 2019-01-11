import _ from 'underscore'
import utils from './utils/index'
import Glass from './components/glass'
const cacehCanvas = utils.getCacheCanvas(500, 500);
const cacheContext = utils.getContext(cacehCanvas);
const context = utils.getContext('#canvas');
let range = 0.01;

const gap = 20;

const glasses=getGlasses(gap,500);
init(cacheContext);
animate();

function init(context) {
  context.translate(0.5, 0.5);
  context.lineWidth = 1;
  context.strokeStyle = '#006633';
}

function getGlasses(gap,width) {
  const glasses = [];
  for (let i = 0; i < width; i += gap / 2) {
    let rand = Math.random().toFixed(1) / 1 + 0.5; //0.5-1.5
    let glass = new Glass({
      x: i + gap * rand - gap,
      y: 500
    });
    glasses.push(glass)
  }
  return glasses;
}

// console.timeEnd();
function animate() {
  // cacheContext.clearRect(0, 0, 500, 500);
  // console.time();
  drawGlasses(cacheContext, glasses);
  context.clearRect(0, 0, 500, 500);
  context.drawImage(cacehCanvas, 0, 0, 500, 500);
  // console.timeEnd();
  requestAnimationFrame(animate);
  // setTimeout(animate,500)
  range += 0.005;
}

function drawGlasses(context, glasses) {
  // console.time();
  cacheContext.fillStyle = '#33ccff';
  cacheContext.fillRect(0, 0, 500, 500);
  let rand = Math.sin(range * Math.PI);
  context.fillStyle = '#339933';
  let ancle = 60 * rand;
  glasses.forEach(glass => glass.draw(cacheContext, ancle))
  // console.timeEnd();
}







// utils.drawRect(75,25,150,1 50)(cacheContext);