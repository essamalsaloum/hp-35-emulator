import K from '../keyCodes'

const swap = state => {
  const [x, y, z, t] = state.stack
  return {
    ...state,
    stack: [y, x, z, t],
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
  [K.LAST_X]: lastX,
  [K.ROLL_DOWN]: rollDown,
  [K.SWAP]: swap,
}