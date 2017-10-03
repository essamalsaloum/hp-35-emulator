import math from 'mathjs'
import C from '../../keyCodes'
import { monadic, dyadic } from './mathHelpers'

const degreesToRadians = degrees => degrees * math.PI / 180.0
const radiansToDegrees = radians => radians * 180.0 / math.PI

const degrees360 = angle => {
  angle %= 360
  if (angle < 0) {
    angle += 360
  }
  return angle
}

const acos = x => math.abs(x) > 1 ? new Error('invalid data') : radiansToDegrees(math.acos(x))
const alog = x => math.pow(10, x)
const asin = x => math.abs(x) > 1 ? new Error('invalid data') : radiansToDegrees(math.asin(x))
const atan = x => radiansToDegrees(math.atan(x))
const cos = x => math.abs(degrees360(x) - 90) % 180 === 0 ? 0 : math.cos(degreesToRadians(degrees360(x)))
const sin = x => math.sin(degreesToRadians(degrees360(x)))
const sq = x => x * x
const sqrt = x => x < 0 ? new Error('√(negative)') : math.sqrt(x)
const tan = x => math.abs(degrees360(x) - 90) % 180 === 0 ? NaN : math.tan(degreesToRadians(degrees360(x)))
const xRoot = (x, y) => math.pow(y, 1 / x)

export default {
  [C.ACOS]: monadic(acos),
  [C.ALOG]: monadic(alog),
  [C.ASIN]: monadic(asin),
  [C.ATAN]: monadic(atan),
  [C.COS]: monadic(cos),
  [C.EXP]: monadic(math.exp),
  [C.LN]: monadic(math.log),
  [C.LOG]: monadic(math.log10),
  [C.POW]: dyadic(math.pow),
  [C.SIN]: monadic(sin),
  [C.SQ]: monadic(sq),
  [C.SQRT]: monadic(sqrt),
  [C.TAN]: monadic(tan),
  [C.XROOT]: dyadic(xRoot),
}

