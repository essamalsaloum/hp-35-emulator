import { newStack } from '../../store/init'

export const enter = state => {
  const [x, ...rest] = state.stack
  return {
    stack: [x, x, ...rest.slice(0, -1)],
    buffer: x.toString(),
    computed: false,
    inputMode: false
  }
}

const clx = state => ({
  stack: [0, ...state.stack.slice(1)],
  buffer: '0',
  computed: false,
  inputMode: false
})

const clr = () => ({
  stack: newStack(),
  buffer: '0',
  computed: false,
  inputMode: false
})

const swapXY = state => {
  const [x, y, ...rest] = state.stack
  return {
    stack: [y, x, ...rest],
    buffer: y.toString(),
    computed: true,
    inputMode: false
  }
}

const rollDown = state => {
  const [x, y, ...rest] = state.stack
  return {
    stack: [y, ...rest, x],
    buffer: y.toString(),
    computed: true,
    inputMode: false
  }
}

export default{
  enter,
  clx,
  clr,
  swapXY,
  rollDown
}