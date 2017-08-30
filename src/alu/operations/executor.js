import * as C from '../opCodes'
import numeric from './numeric'
import stack from './stack'
import math from './math'

const arcMap = {
  [C.SIN]: C.ASIN,
  [C.COS]: C.ACOS,
  [C.TAN]: C.ATAN
}

const reducers = Object.assign({},
  numeric,
  stack,
  math,
  {
    [C.ARC]: {
      entry: null,
      stackLift: null,
      fn: state => state
    }
  }
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
    state = state.stackLift === true ? handleStackLift(state) : state
  }

  if (!fn) {
    console.error(`execute: not implemented [${opCode}]`)
    return state
  }

  return Object.assign({}, fn(state), {
    lastOpCode: opCode,
    entry: entry !== null ? entry : state.entry,
    stackLift: stackLift !== null ? stackLift : state.stackLift
  })
}

export default execute