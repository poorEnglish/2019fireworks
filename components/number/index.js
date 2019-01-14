import Points from './point'
import utils from '../../utils/utils'
import {
  COLORS
} from '../../constants'

// let s1=new Points({x:250,y:400},{x:100,y:200},'red',10,2,2);

let colors = COLORS.warm;
let len = colors.length;


function getNumberPoint(startPoint, number, lineNum) {
  let points = utils.getPointsPositions(startPoint, number, lineNum);
  let numPoints = points.map(endPoint => {
    return new Points(startPoint, endPoint, colors[Math.floor(Math.random() * len)], 6, 2, 2 + endPoint.delay * 2);
  })
  return numPoints;
}

export default getNumberPoint;