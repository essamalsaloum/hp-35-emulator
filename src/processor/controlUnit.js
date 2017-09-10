import * as A from './actionCodes'
import input from './instructions/input'
import stack from './instructions/stack'
import math from './instructions/math'

const arcMap = {
  [A.SIN]: A.ASIN,
  [A.COS]: A.ACOS,
  [A.TAN]: A.ATAN
}

const instructions = {
  ...input,
  ...stack,
  ...math,
  [A.ARC]: {
    entry: null,
    stackLift: null,
    fn: state => state
  }
}

const liftStack = state => {
  const [x, y, z] = state.stack
  return {
    ...state,
    stack: [x, x, y, z]
  }
}

// Make sure two ARC's in a row cancel each other out
const lastAction = (state, actionCode) => actionCode === A.ARC && state.lastAction === A.ARC ? null : actionCode

/*
  The  operations Enter, CLX and CLS disable stack lift.
  A number keyed in after one of these disabling operations writes over the number
  currently in the X–register. The Y–, Z– and T–registers remain unchanged.
*/
export const execute = (state, actionCode) => {
  if (state.lastAction === A.ARC && arcMap[actionCode]) {
    actionCode = arcMap[actionCode]
  }

  const instruction = instructions[actionCode]
  if (!instruction) {
    console.error(`execute: not implemented [${actionCode}]`)
    return state
  }

  const { entry, stackLift, fn } = instruction

  if (entry && state.autoStack) {
    state = state.stackLift === true ? liftStack(state) : state
  }

  return {
    ...fn(state),
    lastAction: lastAction(state, actionCode),
    entry: entry !== null ? entry : state.entry,
    stackLift: stackLift !== null ? stackLift : state.stackLift
  }
}

export default execute