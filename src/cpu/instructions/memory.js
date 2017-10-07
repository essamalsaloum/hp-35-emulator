import K from '../keyCodes'

const storeMem = index => state => {
  const { stack, memory } = state
  memory[index] = stack[0]
  return {
    ...state,
    memory: [...memory]
  }
}

const recallMem = index => state => {
  const {stack, memory} = state
  const [x, y, z] = stack
  return {
    ...state,
    stack: [memory[index] || 0, x, y, z]
  }
}

export default {
  [K.STO_A]: { stackLift: true, fn: storeMem(0) },
  [K.STO_B]: { stackLift: true, fn: storeMem(1) },
  [K.STO_C]: { stackLift: true, fn: storeMem(2) },
  [K.STO_D]: { stackLift: true, fn: storeMem(3) },
  [K.STO_E]: { stackLift: true, fn: storeMem(4) },
  [K.STO_F]: { stackLift: true, fn: storeMem(5) },
  [K.STO_G]: { stackLift: true, fn: storeMem(6) },
  [K.STO_H]: { stackLift: true, fn: storeMem(7) },
  [K.STO_I]: { stackLift: true, fn: storeMem(8) },
  [K.STO_J]: { stackLift: true, fn: storeMem(9) },
  [K.STO_K]: { stackLift: true, fn: storeMem(10) },
  [K.STO_L]: { stackLift: true, fn: storeMem(11) },
  [K.STO_M]: { stackLift: true, fn: storeMem(12) },
  [K.STO_N]: { stackLift: true, fn: storeMem(13) },
  [K.STO_O]: { stackLift: true, fn: storeMem(14) },
  [K.STO_P]: { stackLift: true, fn: storeMem(15) },
  [K.STO_Q]: { stackLift: true, fn: storeMem(16) },
  [K.STO_R]: { stackLift: true, fn: storeMem(17) },
  [K.STO_S]: { stackLift: true, fn: storeMem(18) },
  [K.STO_T]: { stackLift: true, fn: storeMem(19) },
  [K.STO_U]: { stackLift: true, fn: storeMem(20) },
  [K.STO_V]: { stackLift: true, fn: storeMem(21) },
  [K.STO_W]: { stackLift: true, fn: storeMem(22) },
  [K.STO_X]: { stackLift: true, fn: storeMem(23) },
  [K.STO_Y]: { stackLift: true, fn: storeMem(24) },
  [K.STO_Z]: { stackLift: true, fn: storeMem(25) },

  [K.RCL_A]: { stackLift: true, fn: recallMem(0) },
  [K.RCL_B]: { stackLift: true, fn: recallMem(1) },
  [K.RCL_C]: { stackLift: true, fn: recallMem(2) },
  [K.RCL_D]: { stackLift: true, fn: recallMem(3) },
  [K.RCL_E]: { stackLift: true, fn: recallMem(4) },
  [K.RCL_F]: { stackLift: true, fn: recallMem(5) },
  [K.RCL_G]: { stackLift: true, fn: recallMem(6) },
  [K.RCL_H]: { stackLift: true, fn: recallMem(7) },
  [K.RCL_I]: { stackLift: true, fn: recallMem(8) },
  [K.RCL_J]: { stackLift: true, fn: recallMem(9) },
  [K.RCL_K]: { stackLift: true, fn: recallMem(10) },
  [K.RCL_L]: { stackLift: true, fn: recallMem(11) },
  [K.RCL_M]: { stackLift: true, fn: recallMem(12) },
  [K.RCL_N]: { stackLift: true, fn: recallMem(13) },
  [K.RCL_O]: { stackLift: true, fn: recallMem(14) },
  [K.RCL_P]: { stackLift: true, fn: recallMem(15) },
  [K.RCL_Q]: { stackLift: true, fn: recallMem(16) },
  [K.RCL_R]: { stackLift: true, fn: recallMem(17) },
  [K.RCL_S]: { stackLift: true, fn: recallMem(18) },
  [K.RCL_T]: { stackLift: true, fn: recallMem(19) },
  [K.RCL_U]: { stackLift: true, fn: recallMem(20) },
  [K.RCL_V]: { stackLift: true, fn: recallMem(21) },
  [K.RCL_W]: { stackLift: true, fn: recallMem(22) },
  [K.RCL_X]: { stackLift: true, fn: recallMem(23) },
  [K.RCL_Y]: { stackLift: true, fn: recallMem(24) },
  [K.RCL_Z]: { stackLift: true, fn: recallMem(25) },
}