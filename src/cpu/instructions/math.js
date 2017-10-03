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

const monadic = fn => ([x, ...rest]) => ([fn(x), ...rest])
const dyadic = fn => ([x, y, z, t]) => ([fn(x, y), z, t, t])
const dyadic2 = fn => ([x, y, z, t]) => ([fn(x, y), y, z, t])

const div = (x, y) => x === 0 ? new Error('division by 0') : y / x
const inv = x => x === 0 ? new Error('division by 0') : 1 / x
const pct = (x, y) => y * x / 100
const pctChg = (x, y) => (x - y) * (100 / y)

const arithmetic = {
  [C.ADD]: dyadic((x, y) => y + x),
  [C.DIV]: dyadic((x, y) => div(x, y)),
  [C.INTG]: monadic(math.floor),
  [C.INV]: monadic(inv),
  [C.IP]: monadic(math.fix),
  [C.IP]: monadic(math.floor),
  [C.MUL]: dyadic((x, y) => y * x),
  [C.PCT]: dyadic2(pct),
  [C.PCTCHG]: dyadic2(pctChg),
  [C.SUB]: dyadic((x, y) => y - x),
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

const transcendental = {
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

const fact = x => x < 0 || math.floor(x) !== x ? new Error('invalid data') : math.factorial(math.floor(x))
const nCr = (x, y) => {
  if (x < 0 || math.floor(x) !== x || y < 0 || math.floor(y) !== y || x > y) {
    return new Error('invalid data')
  }
  return math.combinations(y, x)
}
const nPr = (x, y) => {
  if (x < 0 || math.floor(x) !== x || y < 0 || math.floor(y) !== y || x > y) {
    return new Error('invalid data')
  }
  return math.permutations(y, x)
}

const probability = {
  [C.FACT]: monadic(fact),
  [C.NCR]: dyadic(nCr),
  [C.NPR]: dyadic(nPr),
}

const funcs = {
  ...arithmetic,
  ...transcendental,
  ...probability,
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
