import K from '../keyCodes'

export const liftStack = state => {
  const [x, y, z] = state.stack
  return {
    ...state,
    stack: [x, x, y, z]
  }
}

const clx = state => ({
  ...state,
  stack: [0, ...state.stack.slice(1)]
})

const clr = state => ({
  ...state,
  stack: [0, 0, 0, 0]
})

const swap = state => {
  const [x, y, z, t] = state.stack
  return {
    ...state,
    stack: [y, x, z, t]
  }
}

const rollDown = state => {
  const [x, y, z, t] = state.stack
  return {
    ...state,
    stack: [y, z, t, x]
  }
}

export default {
  [K.ENTER]: { stackLift: false, fn: liftStack },
  [K.CANCEL]: { stackLift: false, fn: clx },
  [K.CLX]: { stackLift: false, fn: clx },
  [K.CLR]: { stackLift: false, fn: clr },
  [K.SWAP]: { stackLift: true, fn: swap },
  [K.ROLL_DOWN]: { stackLift: true, fn: rollDown },
}