import * as C from '../opCodes'
import { newStack } from '../../store/init'

export const enter = state => {
  const [x, ...rest] = state.stack
  return {
    stack: [x, x, ...rest.slice(0, -1)],
    buffer: x.toString(),
    liftStack: false,
    inputMode: false
  }
}

const clx = state => ({
  stack: [0, ...state.stack.slice(1)],
  buffer: '0',
  liftStack: false,
  inputMode: false
})

const clr = () => ({
  stack: newStack(),
  buffer: '0',
  liftStack: false,
  inputMode: false
})

const swap = state => {
  const [x, y, ...rest] = state.stack
  return {
    stack: [y, x, ...rest],
    buffer: y.toString(),
    liftStack: true,
    inputMode: false
  }
}

const rollDown = state => {
  const [x, y, ...rest] = state.stack
  return {
    stack: [y, ...rest, x],
    buffer: y.toString(),
    liftStack: true,
    inputMode: false
  }
}

export default{
  [C.ENTER]: enter,
  [C.CLX]: clx,
  [C.CLR]: clr,
  [C.SWAP]: swap,
  [C.ROLL_DOWN]: rollDown
}