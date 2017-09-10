import * as A from '../actionCodes'
const degreesToRadians = degrees => degrees * Math.PI / 180.0
const radiansToDegrees = radians => radians * 180.0 / Math.PI

export default {
  [A.POW]: (x, y) => Math.pow(x, y),
  [A.LOG]: x => Math.log10(x),
  [A.LN]: x => Math.log(x),
  [A.EXP]: x => Math.exp(x),
  [A.SQRT]: x => Math.sqrt(x),
  [A.RECIPROCAL]: x => 1 / x,
  [A.SIN]: x => Math.sin(degreesToRadians(x)),
  [A.COS]: x => Math.cos(degreesToRadians(x)),
  [A.TAN]: x => Math.tan(degreesToRadians(x)),
  [A.ASIN]: x => radiansToDegrees(Math.asin(x)),
  [A.ACOS]: x => radiansToDegrees(Math.acos(x)),
  [A.ATAN]: x => radiansToDegrees(Math.atan(x))
}
