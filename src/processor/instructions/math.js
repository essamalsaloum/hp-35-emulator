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

const arithmetic = {
  [C.ADD]: (x, y) => y + x,
  [C.SUB]: (x, y) => y - x,
  [C.MUL]: (x, y) => y * x,
  [C.DIV]: (x, y) => x === 0 ? new Error('division by 0') : y / x,
  [C.INV]: x => x === 0 ? new Error('division by 0') :1 / x,
  [C.IP]: x => math.floor(x)
}

const transcendental = {
  [C.ACOS]: x => math.abs(x) > 1 ? new Error('invalid data') : radiansToDegrees(math.acos(x)),
  [C.ALOG]: x => math.pow(10, x),
  [C.ASIN]: x => math.abs(x) > 1 ? new Error('invalid data') : radiansToDegrees(math.asin(x)),
  [C.ATAN]: x => radiansToDegrees(math.atan(x)),
  [C.COS]: x => math.cos(degreesToRadians(degrees360(x))),
  [C.EXP]: x => math.exp(x),
  [C.LN]: x => math.log(x),
  [C.LOG]: x => math.log10(x),
  [C.POW]: (x, y) => math.pow(y, x),
  [C.ROOT]: (x, y) => math.pow(y, 1 / x),
  [C.SIN]: x => math.sin(degreesToRadians(degrees360(x))),
  [C.SQ]: x => x * x,
  [C.SQRT]: x =>x < 0 ? new Error('√(negative)') : math.sqrt(x),
  [C.TAN]: x => math.abs(degrees360(x) - 90) % 180 === 0 ? NaN : math.tan(degreesToRadians(degrees360(x)))
}

const funcs = {
  ...arithmetic,
  ...transcendental
}

const monadicFn = ([x, y, z, t], fn) => [fn(x), y, z, t]
const dyadicFn = ([x, y, z, t], fn) => [fn(x, y), z, t, t]

const compute = keyCode => state => {
  let { stack } = state
  const fn = funcs[keyCode]
  if (!fn) {
    throw new Error(`math: not implemented [${keyCode}]`)
  }
  stack = fn.length === 2 ? dyadicFn(stack, fn) : monadicFn(stack, fn)
  return { ...state,  stack }
}

export default Object.keys(funcs).reduce((prev, keyCode) => {
  prev[keyCode] = { stackLift: true, fn: compute(keyCode) }
  return prev
}, {})
