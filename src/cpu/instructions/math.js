import C from '../keyCodes'
import math from 'mathjs'

const degreesToRadians = degrees => degrees * math.PI / 180.0
const radiansToDegrees = radians => radians * 180.0 / math.PI

const degrees360 = angle => {
  angle %= 360
  if (angle < 0) {
    angle += 360
  }
  return angle
}

const monadic = fn => ([x, y, z, t]) => [fn(x), y, z, t]
const dyadic = fn => ([x, y, z, t]) => [fn(x, y), z, t, t]
const dyadicPreserveY = fn => ([x, y, z, t]) => [fn(x, y), y, z, t]

const arithmetic = {
  [C.ADD]: dyadic((x, y) => y + x),
  [C.SUB]: dyadic((x, y) => y - x),
  [C.MUL]: dyadic((x, y) => y * x),
  [C.DIV]: dyadic((x, y) => x === 0 ? new Error('division by 0') : y / x),
  [C.INV]: monadic(x => x === 0 ? new Error('division by 0') : 1 / x),
  [C.IP]: monadic(x => math.floor(x)),
  [C.PCT]: dyadicPreserveY((x, y) => y * x / 100),
  [C.PCTCHG]: dyadicPreserveY((x, y) => (x - y) * (100 / y))
}

const transcendental = {
  [C.ACOS]: monadic(x => math.abs(x) > 1 ? new Error('invalid data') : radiansToDegrees(math.acos(x))),
  [C.ALOG]: monadic(x => math.pow(10, x)),
  [C.ASIN]: monadic(x => math.abs(x) > 1 ? new Error('invalid data') : radiansToDegrees(math.asin(x))),
  [C.ATAN]: monadic(x => radiansToDegrees(math.atan(x))),
  [C.COS]: monadic(x => math.cos(degreesToRadians(degrees360(x)))),
  [C.EXP]: monadic(x => math.exp(x)),
  [C.LN]: monadic(x => math.log(x)),
  [C.LOG]: monadic(x => math.log10(x)),
  [C.POW]: dyadic((x, y) => math.pow(y, x)),
  [C.ROOT]: dyadic((x, y) => math.pow(y, 1 / x)),
  [C.SIN]: monadic(x => math.sin(degreesToRadians(degrees360(x)))),
  [C.SQ]: monadic(x => x * x),
  [C.SQRT]: monadic(x => x < 0 ? new Error('√(negative)') : math.sqrt(x)),
  [C.TAN]: monadic(x => math.abs(degrees360(x) - 90) % 180 === 0 ? NaN : math.tan(degreesToRadians(degrees360(x))))
}

const statistical = {
  [C.FACT]: x => x < 0 ? new Error('!(negative)') : math.factorial(math.floor(x))
}

const funcs = {
  ...arithmetic,
  ...transcendental,
  ...statistical
}

const compute = keyCode => state => {
  let { stack } = state
  const fn = funcs[keyCode]
  if (!fn) {
    throw new Error(`math: not implemented [${keyCode}]`)
  }
  return { ...state, stack: fn(stack) }
}

export default Object.keys(funcs).reduce((prev, keyCode) => {
  prev[keyCode] = { stackLift: true, fn: compute(keyCode) }
  return prev
}, {})
