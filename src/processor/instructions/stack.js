import * as C from '../opCodes'
import { newStack } from '../../store/init'


const enter = state => {
  const [x, ...rest] = state.stack
  return {
    ...state,
    stack: [x, x, ...rest.slice(0, -1)],
    buffer: x.toString()
  }
}

const clx = state => ({
  ...state,
  stack: [0, ...state.stack.slice(1)],
  buffer: '0'
})

const clr = state => ({
  ...state,
  stack: newStack(),
  buffer: '0'
})

const swap = state => {
  const [x, y, ...rest] = state.stack
  return {
    ...state,
    stack: [y, x, ...rest],
    buffer: y.toString()
  }
}

const rollDown = state => {
  const [x, y, ...rest] = state.stack
  return {
    ...state,
    stack: [y, ...rest, x],
    buffer: y.toString()
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
  // eslint-disable-next-line no-unused-vars
  const [x, ...rest] = state.stack
  return {
    ...state,
    stack: [state.memory, ...rest],
    buffer: state.memory.toString()
  }
}

export default {
  [C.ENTER]: { entry: false, stackLift: false, fn: enter },
  [C.CLX]: { entry: false, stackLift: false, fn: clx },
  [C.CLR]: { entry: false, stackLift: false, fn: clr },
  [C.SWAP]: { entry: false, stackLift: true, fn: swap },
  [C.ROLL_DOWN]: { entry: false, stackLift: true, fn: rollDown },
  [C.STO]: { entry: false, stackLift: true, fn: storeMem },
  [C.RCL]: { entry: false, stackLift: true, fn: recallMem }
}