import C from '../keyCodes'
import * as util from '../../processor/util'

export const liftStack = state => {
  const [x, y, z] = state.stack
  return {
    ...state,
    stack: [x, x, y, z]
  }
}

const enter = state => {
  const [x, y, z] = state.stack
  return {
    ...state,
    stack: [x, x, y, z],
    buffer: util.formatNumber(x)
  }
}

const clx = state => ({
  ...state,
  stack: [0, ...state.stack.slice(1)],
  buffer: '0'
})

const clr = state => ({
  ...state,
  stack: [0, 0, 0, 0],
  buffer: '0'
})

const swap = state => {
  const [x, y, z, t] = state.stack
  return {
    ...state,
    stack: [y, x, z, t],
    buffer: util.formatNumber(y)
  }
}

const rollDown = state => {
  const [x, y, z, t] = state.stack
  return {
    ...state,
    stack: [y, z, t, x],
    buffer: util.formatNumber(y)
  }
}

const storeMem = state => {
  return {
    ...state,
    memory: state.stack[0]
  }
}

const recallMem = state => {
  state = enter(state)
  const [, y, z, t] = state.stack
  return {
    ...state,
    stack: [state.memory, y, z, t],
    buffer: util.formatNumber(state.memory)
  }
}

export const stackInstructions = {
  [C.ENTER]: { entry: false, stackLift: false, fn: enter },
  [C.CLX]: { entry: false, stackLift: false, fn: clx },
  [C.CLR]: { entry: false, stackLift: false, fn: clr },
  [C.SWAP]: { entry: false, stackLift: true, fn: swap },
  [C.ROLL_DOWN]: { entry: false, stackLift: true, fn: rollDown },
  [C.STO]: { entry: false, stackLift: true, fn: storeMem },
  [C.RCL]: { entry: false, stackLift: true, fn: recallMem }
}