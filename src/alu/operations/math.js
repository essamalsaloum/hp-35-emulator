import * as C from '../opCodes'
import compute from '../math/computer'

const opCodes = [
  C.ACOS,
  C.ADD,
  C.ASIN,
  C.ATAN,
  C.CHS,
  C.COS,
  C.DIV,
  C.EXP,
  C.LN,
  C.LOG,
  C.MUL,
  C.POW,
  C.RECIPROC,
  C.SIN,
  C.SQRT,
  C.SUB,
  C.TAN
]

export default opCodes.reduce((prev, opCode) => {
  prev[opCode] = compute(opCode)
  return prev
}, {})
