import math from 'mathjs'
import K from '../../keyCodes'
import { monadic, dyadic } from './mathHelpers'
import { degreesToRadians, radiansToDegrees } from './conversions'

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
const xRoot = (y, x) => math.pow(y, 1 / x)

export default {
  [K.ACOS]: monadic(acos),
  [K.ALOG]: monadic(alog),
  [K.ASIN]: monadic(asin),
  [K.ATAN]: monadic(atan),
  [K.COS]: monadic(cos),
  [K.EXP]: monadic(math.exp),
  [K.LN]: monadic(math.log),
  [K.LOG]: monadic(math.log10),
  [K.POW]: dyadic(math.pow),
  [K.SIN]: monadic(sin),
  [K.SQ]: monadic(sq),
  [K.SQRT]: monadic(sqrt),
  [K.TAN]: monadic(tan),
  [K.XROOT]: dyadic(xRoot),
}

