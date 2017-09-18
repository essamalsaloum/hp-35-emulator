import C from '../keyCodes'

const degreesToRadians = degrees => degrees * Math.PI / 180.0
const radiansToDegrees = radians => radians * 180.0 / Math.PI

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
  [C.ACOS]: x => radiansToDegrees(Math.acos(x)),
  [C.ALOG]: x => Math.pow(10, x),
  [C.ASIN]: x => radiansToDegrees(Math.asin(x)),
  [C.ATAN]: x => radiansToDegrees(Math.atan(x)),
  [C.COS]: x => Math.cos(degreesToRadians(degrees360(x))),
  [C.EXP]: x => Math.exp(x),
  [C.LN]: x => Math.log(x),
  [C.LOG]: x => Math.log10(x),
  [C.POW]: (x, y) => Math.pow(y, x),
  [C.ROOT]: (x, y) => Math.pow(y, 1 / x),
  [C.SIN]: x => Math.sin(degreesToRadians(degrees360(x))),
  [C.SQR]: x => x * x,
  [C.SQRT]: x => Math.sqrt(x),
  [C.TAN]: x => Math.abs(degrees360(x) - 90) % 180 === 0 ? NaN : Math.tan(degreesToRadians(degrees360(x)))
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
    buffer: newStack[0].toString()
  }
}

export const mathInstructions = Object.keys(funcs).reduce((prev, keyCode) => {
  prev[keyCode] = { entry: false, stackLift: true, fn: compute(keyCode) }
  return prev
}, {})
