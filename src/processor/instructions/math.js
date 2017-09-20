import C from '../keyCodes'
import math from 'mathjs'
import * as util from '../../processor/util'

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
  [C.DIV]: (x, y) => y / x,
  [C.RECIPROCAL]: x => 1 / x
}

const transcendental = {
  [C.ACOS]: x => radiansToDegrees(math.acos(x)),
  [C.ALOG]: x => math.pow(10, x),
  [C.ASIN]: x => radiansToDegrees(math.asin(x)),
  [C.ATAN]: x => radiansToDegrees(math.atan(x)),
  [C.COS]: x => math.cos(degreesToRadians(degrees360(x))),
  [C.EXP]: x => math.exp(x),
  [C.LN]: x => math.log(x),
  [C.LOG]: x => math.log10(x),
  [C.POW]: (x, y) => math.pow(y, x),
  [C.ROOT]: (x, y) => math.pow(y, 1 / x),
  [C.SIN]: x => math.sin(degreesToRadians(degrees360(x))),
  [C.SQR]: x => x * x,
  [C.SQRT]: x => math.sqrt(x),
  [C.TAN]: x => math.abs(degrees360(x) - 90) % 180 === 0 ? NaN : math.tan(degreesToRadians(degrees360(x)))
}

const funcs = {
  ...arithmetic,
  ...transcendental
}

const monadicFn = ([x, y, z, t], fn) => [fn(x), y, z, t]

const dyadicFn = ([x, y, z, t], fn) => [fn(x, y), z, t, t]

const compute = keyCode => state => {
  const { stack } = state
  const func = funcs[keyCode]
  if (!func) {
    console.error(`math: not implemented [${keyCode}]`)
    return state
  }

  const newStack = func.length === 2 ? dyadicFn(stack, func) : monadicFn(stack, func)

  return {
    ...state,
    stack: newStack,
    buffer: util.formatNumber(newStack[0])
  }
}

export const mathInstructions = Object.keys(funcs).reduce((prev, keyCode) => {
  prev[keyCode] = { entry: false, stackLift: true, fn: compute(keyCode) }
  return prev
}, {})
