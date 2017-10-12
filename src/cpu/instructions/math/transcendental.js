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

const nonNegative = (x, fn) => x < 0 ? new Error('invalid data') : fn(x)

const acos = x => math.abs(x) > 1 ? new Error('invalid data') : radiansToDegrees(math.acos(x))
const alog = x => math.pow(10, x)
const asin = x => math.abs(x) > 1 ? new Error('invalid data') : radiansToDegrees(math.asin(x))
const atan = x => radiansToDegrees(math.atan(x))
const cos = x => math.abs(degrees360(x) - 90) % 180 === 0 ? 0 : math.cos(degreesToRadians(degrees360(x)))
const expm = x => math.exp(x-1)
const lnp1 = x => nonNegative(x+1, math.log)
const log = x => nonNegative(x+1, math.log)
const pow = (x, y) => math.pow(y, x)
const sin = x => math.sin(degreesToRadians(degrees360(x)))
const sq = x => x * x
const sqrt = x => x < 0 ? new Error('√(negative)') : math.sqrt(x)
const tan = x => math.abs(degrees360(x) - 90) % 180 === 0 ? NaN : math.tan(degreesToRadians(degrees360(x)))
const xRoot = (x, y) => math.pow(y, 1 / x)
const pi = () => Math.PI

export default {
  [K.ACOS]: monadic(acos),
  [K.ACOSH]: monadic(math.acosh),
  [K.ALOG]: monadic(alog),
  [K.ASIN]: monadic(asin),
  [K.ASINH]: monadic(math.asinh),
  [K.ATAN]: monadic(atan),
  [K.ATANH]: monadic(math.atanh),
  [K.COS]: monadic(cos),
  [K.COSH]: monadic(math.cosh),
  [K.EXP]: monadic(math.exp),
  [K.EXPM]: monadic(expm),
  [K.LN]: monadic(math.log),
  [K.LNP1]: monadic(lnp1),
  [K.LOG]: monadic(log),
  [K.PI]: monadic(pi),
  [K.POW]: dyadic(pow),
  [K.SIN]: monadic(sin),
  [K.SINH]: monadic(math.sinh),
  [K.SQ]: monadic(sq),
  [K.SQRT]: monadic(sqrt),
  [K.TAN]: monadic(tan),
  [K.TANH]: monadic(math.tanh),
  [K.XROOT]: dyadic(xRoot),
}

