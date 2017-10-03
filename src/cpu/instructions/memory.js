import C from '../keyCodes'

const storeMem = state => {
  return {
    ...state,
    memory: state.stack[0]
  }
}

const recallMem = state => {
  const [x, y, z] = state.stack
  return {
    ...state,
    stack: [state.memory, x, y, z]
  }
}

export default {
  [C.STO]: { entry: false, stackLift: true, fn: storeMem },
  [C.RCL]: { entry: false, stackLift: true, fn: recallMem },
}