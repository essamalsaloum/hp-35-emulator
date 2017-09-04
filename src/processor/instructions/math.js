import * as C from '../keyCodes'
import evaluate from '../math/evaluate'

const keyCodes = [
  C.ACOS,
  C.ADD,
  C.ASIN,
  C.ATAN,
  C.COS,
  C.DIV,
  C.EXP,
  C.LN,
  C.LOG,
  C.MUL,
  C.POW,
  C.RECIPROCAL,
  C.SIN,
  C.SQRT,
  C.SUB,
  C.TAN
]

export default keyCodes.reduce((prev, keyCode) => {
  prev[keyCode] = { entry: false, stackLift: true, fn: evaluate(keyCode) }
  return prev
}, {})
