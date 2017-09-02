import * as C from './opCodes'
import input from './instructions/input'
import stack from './instructions/stack'
import math from './instructions/math'

const arcMap = {
  [C.SIN]: C.ASIN,
  [C.COS]: C.ACOS,
  [C.TAN]: C.ATAN
}

const instructions = Object.assign({},
  input,
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

const liftStack = state => {
  const [x, ...rest] = state.stack
  return {
    ...state,
    stack: [x, x, ...rest.slice(0, -1)]
  }
}

// Make sure two ARC's in a row cancel each other out
const lastOpCode = (state, opCode) => opCode === C.ARC && state.lastOpCode === C.ARC ? null : opCode

/*
  The  operations Enter, CLX and CLS disable stack lift.
  A number keyed in after one of these disabling operations writes over the number
  currently in the X–register. The Y–, Z– and T–registers remain unchanged.
*/
export const execute = opCode => state => {
  if (state.lastOpCode === C.ARC && arcMap[opCode]) {
    opCode = arcMap[opCode]
  }

  const instruction = instructions[opCode]
  if (!instruction) {
    console.error(`execute: not implemented [${opCode}]`)
    return state
  }

  const { entry, stackLift, fn } = instruction

  if (entry && state.autoStack) {
    state = state.stackLift === true ? liftStack(state) : state
  }

  return Object.assign({},
    fn(state),
    {
      lastOpCode: lastOpCode(state, opCode),
      entry: entry !== null ? entry : state.entry,
      stackLift: stackLift !== null ? stackLift : state.stackLift
    })
}

export default execute