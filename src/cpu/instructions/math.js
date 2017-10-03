import C from '../keyCodes'
import math from 'mathjs'
import flow from 'lodash/flow'

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
  [C.ADD]: ([x, y, z, t]) => [y + x, z, t, t],
  [C.SUB]: ([x, y, z, t]) => [y - x, z, t, t],
  [C.MUL]: ([x, y, z, t]) => [y * x, z, t, t],
  [C.DIV]: ([x, y, z, t]) => x === 0 ? new Error('division by 0') : [y / x, z, t, t],
  [C.INV]: ([x, ...rest]) => x === 0 ? new Error('division by 0') : [1 / x, ...rest],
  [C.IP]: ([x, ...rest]) => [math.floor(x), ...rest],
  [C.PCT]: ([x, y, ...rest]) => [y * x / 100, y, ...rest],
  [C.PCTCHG]: ([x, y, ...rest]) => [(x - y) * (100 / y), y, ...rest]
}

const abs = x => math.abs(x) > 1 ? new Error('invalid data') : radiansToDegrees(math.acos(x))
const asin = x => math.abs(x) > 1 ? new Error('invalid data') : radiansToDegrees(math.asin(x))
const atan = x => radiansToDegrees(math.atan(x))
const cos = x => math.abs(degrees360(x) - 90) % 180 === 0 ? 0 : math.cos(degreesToRadians(degrees360(x)))
const sin = x => math.sin(degreesToRadians(degrees360(x)))
const sqrt = x => x < 0 ? new Error('√(negative)') : math.sqrt(x)
const tan = x => math.abs(degrees360(x) - 90) % 180 === 0 ? NaN : math.tan(degreesToRadians(degrees360(x)))

const transcendental = {
  [C.ACOS]: ([x, ...rest]) => [abs(x), ...rest],
  [C.ALOG]: ([x, ...rest]) => [math.pow(10, x), ...rest],
  [C.ASIN]: ([x, ...rest]) => [asin(x), ...rest],
  [C.ATAN]: ([x, ...rest]) => [atan(x), ...rest],
  [C.COS]: ([x, ...rest]) => [cos(x), ...rest],
  [C.EXP]: ([x, ...rest]) => [math.exp(x), ...rest],
  [C.LN]: ([x, ...rest]) => [math.log(x), ...rest],
  [C.LOG]: ([x, ...rest]) => [math.log10(x), ...rest],
  [C.POW]: ([x, y, z, t]) => [math.pow(y, x), z, t, t],
  [C.ROOT]: ([x, y, z, t]) => [math.pow(y, 1 / x), z, t, t],
  [C.SIN]: ([x, ...rest]) => [sin(x), ...rest],
  [C.SQ]: ([x, ...rest]) => [x * x , ...rest],
  [C.SQRT]: ([x, ...rest]) => [sqrt(x), ...rest],
  [C.TAN]: ([x, ...rest]) => [tan(x), ...rest]
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
  const fn = funcs[keyCode]
  if (!fn) {
    throw new Error(`math: not implemented [${keyCode}]`)
  }
  const { stack } = state
  return { ...state, stack: fn(stack) }
}

export default Object.keys(funcs).reduce((prev, keyCode) => {
  prev[keyCode] = { stackLift: true, fn: compute(keyCode) }
  return prev
}, {})
