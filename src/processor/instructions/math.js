import * as C from '../opCodes'
import evaluate from '../math/evaluate'

const opCodes = [
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

export default opCodes.reduce((prev, opCode) => {
  prev[opCode] = { entry: false, stackLift: true, fn: evaluate(opCode) }
  return prev
}, {})
