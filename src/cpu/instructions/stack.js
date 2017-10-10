import K from '../keyCodes'

export const liftStack = state => {
  const [x, y, z] = state.stack
  return {
    ...state,
    stack: [x, x, y, z]
  }
}
const clr = state => ({
  ...state,
  stack: [0, 0, 0, 0],
  lastX: 0,
  error: null,
  stackLift: false,
  entry: true
})

const swap = state => {
  const [x, y, z, t] = state.stack
  return {
    ...state,
    stack: [y, x, z, t],
    entry: false
  }
}

const rollDown = state => {
  const [x, y, z, t] = state.stack
  return {
    ...state,
    stack: [y, z, t, x]
  }
}

const lastX = state => {
  const [x, y, z] = state.stack
  return {
    ...state,
    stack: [state.lastX, x, y, z]
  }
}

export default {
  [K.CLR]: { stackLift: false, fn: clr },
  [K.ENTER]: { stackLift: false, fn: liftStack },
  [K.LAST_X]: {stackLift: true, fn: lastX},
  [K.ROLL_DOWN]: { stackLift: true, fn: rollDown },
  [K.SWAP]: { stackLift: true, fn: swap },
}