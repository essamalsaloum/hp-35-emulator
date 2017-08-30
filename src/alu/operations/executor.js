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

const handleStackLift = state => {
  const [x, ...rest] = state.stack
  return {
    ...state,
    stack: [x, x, ...rest.slice(0, -1)]
  }
}

export const execute = opCode => state => {
  if (state.lastOpCode === C.ARC && arcMap[opCode]) {
    opCode = arcMap[opCode]
  }

  const { entry, stackLift, fn } = reducers[opCode]

  if (entry) {
    state = state.stackLift ? handleStackLift(state) : state
  }

  if (!fn) {
    console.error(`execute: not implemented [${opCode}]`)
    return state
  }
  return Object.assign(fn(state), { stackLift, entry, lastOpCode: opCode })
}

export default execute