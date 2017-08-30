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

// Make sure to ARC's in a row cancel each other out
const lastOpCode = (state, opCode) => opCode === C.ARC && state.lastOpCode === C.ARC ? null : opCode

export const execute = opCode => state => {
  if (state.lastOpCode === C.ARC && arcMap[opCode]) {
    opCode = arcMap[opCode]
  }

  const reducer = reducers[opCode]
  if (!reducer) {
    console.error(`execute: not implemented [${opCode}]`)
    return state
  }

  const { entry, stackLift, fn } = reducer

  if (entry) {
    state = state.stackLift === true ? handleStackLift(state) : state
  }

  return Object.assign({}, fn(state), {
    lastOpCode: lastOpCode(state, opCode),
    entry: entry !== null ? entry : state.entry,
    stackLift: stackLift !== null ? stackLift : state.stackLift
  })
}

export default execute