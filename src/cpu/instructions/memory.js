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
  [K.STO_A]: { entry: false, stackLift: true, fn: storeMem(0) },
  [K.STO_B]: { entry: false, stackLift: true, fn: storeMem(1) },
  [K.STO_C]: { entry: false, stackLift: true, fn: storeMem(2) },
  [K.STO_D]: { entry: false, stackLift: true, fn: storeMem(3) },
  [K.STO_E]: { entry: false, stackLift: true, fn: storeMem(4) },
  [K.STO_F]: { entry: false, stackLift: true, fn: storeMem(5) },
  [K.STO_G]: { entry: false, stackLift: true, fn: storeMem(6) },
  [K.STO_H]: { entry: false, stackLift: true, fn: storeMem(7) },
  [K.STO_I]: { entry: false, stackLift: true, fn: storeMem(8) },
  [K.STO_J]: { entry: false, stackLift: true, fn: storeMem(9) },
  [K.STO_K]: { entry: false, stackLift: true, fn: storeMem(10) },
  [K.STO_L]: { entry: false, stackLift: true, fn: storeMem(11) },
  [K.STO_M]: { entry: false, stackLift: true, fn: storeMem(12) },
  [K.STO_N]: { entry: false, stackLift: true, fn: storeMem(13) },
  [K.STO_O]: { entry: false, stackLift: true, fn: storeMem(14) },
  [K.STO_P]: { entry: false, stackLift: true, fn: storeMem(15) },
  [K.STO_Q]: { entry: false, stackLift: true, fn: storeMem(16) },
  [K.STO_R]: { entry: false, stackLift: true, fn: storeMem(17) },
  [K.STO_S]: { entry: false, stackLift: true, fn: storeMem(18) },
  [K.STO_T]: { entry: false, stackLift: true, fn: storeMem(19) },
  [K.STO_U]: { entry: false, stackLift: true, fn: storeMem(20) },
  [K.STO_V]: { entry: false, stackLift: true, fn: storeMem(21) },
  [K.STO_W]: { entry: false, stackLift: true, fn: storeMem(22) },
  [K.STO_X]: { entry: false, stackLift: true, fn: storeMem(23) },
  [K.STO_Y]: { entry: false, stackLift: true, fn: storeMem(24) },
  [K.STO_Z]: { entry: false, stackLift: true, fn: storeMem(25) },

  [K.RCL_A]: { entry: false, stackLift: true, fn: recallMem(0) },
  [K.RCL_B]: { entry: false, stackLift: true, fn: recallMem(1) },
  [K.RCL_C]: { entry: false, stackLift: true, fn: recallMem(2) },
  [K.RCL_D]: { entry: false, stackLift: true, fn: recallMem(3) },
  [K.RCL_E]: { entry: false, stackLift: true, fn: recallMem(4) },
  [K.RCL_F]: { entry: false, stackLift: true, fn: recallMem(5) },
  [K.RCL_G]: { entry: false, stackLift: true, fn: recallMem(6) },
  [K.RCL_H]: { entry: false, stackLift: true, fn: recallMem(7) },
  [K.RCL_I]: { entry: false, stackLift: true, fn: recallMem(8) },
  [K.RCL_J]: { entry: false, stackLift: true, fn: recallMem(9) },
  [K.RCL_K]: { entry: false, stackLift: true, fn: recallMem(10) },
  [K.RCL_L]: { entry: false, stackLift: true, fn: recallMem(11) },
  [K.RCL_M]: { entry: false, stackLift: true, fn: recallMem(12) },
  [K.RCL_N]: { entry: false, stackLift: true, fn: recallMem(13) },
  [K.RCL_O]: { entry: false, stackLift: true, fn: recallMem(14) },
  [K.RCL_P]: { entry: false, stackLift: true, fn: recallMem(15) },
  [K.RCL_Q]: { entry: false, stackLift: true, fn: recallMem(16) },
  [K.RCL_R]: { entry: false, stackLift: true, fn: recallMem(17) },
  [K.RCL_S]: { entry: false, stackLift: true, fn: recallMem(18) },
  [K.RCL_T]: { entry: false, stackLift: true, fn: recallMem(19) },
  [K.RCL_U]: { entry: false, stackLift: true, fn: recallMem(20) },
  [K.RCL_V]: { entry: false, stackLift: true, fn: recallMem(21) },
  [K.RCL_W]: { entry: false, stackLift: true, fn: recallMem(22) },
  [K.RCL_X]: { entry: false, stackLift: true, fn: recallMem(23) },
  [K.RCL_Y]: { entry: false, stackLift: true, fn: recallMem(24) },
  [K.RCL_Z]: { entry: false, stackLift: true, fn: recallMem(25) },
}