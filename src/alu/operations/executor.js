import * as C from '../opCodes'
import numeric from './numeric'
import stack from './stack'
import math from './math'

const arcMap = {
  [C.SIN]: C.ASIN,
  [C.COS]: C.ACOS,
  [C.TAN]: C.ATAN
}

const identity = state => state

const reducers = Object.assign({},
  numeric,
  stack,
  math,
  { [C.ARC]: identity }
)

export const execute = opCode => state => {
  if (state.prevOpCode === C.ARC && arcMap[opCode]) {
    opCode = arcMap[opCode]
  }
  const reducer = reducers[opCode]
  if (!reducer) {
    console.error(`execute: not implemented [${opCode}]`)
    return state
  }
  return Object.assign(reducer(state), { prevOpCode: opCode })
}

export default execute