import * as C from '../keyCodes'
const degreesToRadians = degrees => degrees * Math.PI / 180.0
const radiansToDegrees = radians => radians * 180.0 / Math.PI

export default {
  [C.POW]: (x, y) => Math.pow(x, y),
  [C.LOG]: x => Math.log10(x),
  [C.LN]: x => Math.log(x),
  [C.EXP]: x => Math.exp(x),
  [C.SQRT]: x => Math.sqrt(x),
  [C.RECIPROCAL]: x => 1 / x,
  [C.SIN]: x => Math.sin(degreesToRadians(x)),
  [C.COS]: x => Math.cos(degreesToRadians(x)),
  [C.TAN]: x => Math.tan(degreesToRadians(x)),
  [C.ASIN]: x => radiansToDegrees(Math.asin(x)),
  [C.ACOS]: x => radiansToDegrees(Math.acos(x)),
  [C.ATAN]: x => radiansToDegrees(Math.atan(x))
}
