import * as C from '../opCodes'
const degreesToRadians = degrees => degrees * Math.PI / 180.0
const radiansToDegrees = radians => radians * 180.0 / Math.PI

export default {
  [C.POW]: { arity: 2, fn: (x, y) => Math.pow(y, x) },
  [C.LOG]: { arity: 1, fn: x => Math.log10(x) },
  [C.LN]: { arity: 1, fn: x => Math.log(x) },
  [C.EXP]: { arity: 1, fn: x => Math.exp(x) },
  [C.SQRT]: { arity: 1, fn: x => Math.sqrt(x) },

  [C.RECIPROC]: { arity: 1, fn: x => 1 / x },

  [C.SIN]: { arity: 1, fn: x => Math.sin(degreesToRadians(x)) },
  [C.COS]: { arity: 1, fn: x => Math.cos(degreesToRadians(x)) },
  [C.TAN]: { arity: 1, fn: x => Math.tan(degreesToRadians(x)) },

  [C.ASIN]: { arity: 1, fn: x => radiansToDegrees(Math.asin(x)) },
  [C.ACOS]: { arity: 1, fn: x => radiansToDegrees(Math.acos(x)) },
  [C.ATAN]: { arity: 1, fn: x => radiansToDegrees(Math.atan(x)) }
}
