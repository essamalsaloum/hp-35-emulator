import C from '../keyCodes'

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
  [C.STO_A]: { entry: false, stackLift: true, fn: storeMem(0) },
  [C.STO_B]: { entry: false, stackLift: true, fn: storeMem(1) },
  [C.STO_C]: { entry: false, stackLift: true, fn: storeMem(2) },
  [C.STO_D]: { entry: false, stackLift: true, fn: storeMem(3) },
  [C.STO_E]: { entry: false, stackLift: true, fn: storeMem(4) },
  [C.STO_F]: { entry: false, stackLift: true, fn: storeMem(5) },
  [C.STO_G]: { entry: false, stackLift: true, fn: storeMem(6) },
  [C.STO_H]: { entry: false, stackLift: true, fn: storeMem(7) },
  [C.STO_I]: { entry: false, stackLift: true, fn: storeMem(8) },
  [C.STO_J]: { entry: false, stackLift: true, fn: storeMem(9) },
  [C.STO_K]: { entry: false, stackLift: true, fn: storeMem(10) },
  [C.STO_L]: { entry: false, stackLift: true, fn: storeMem(11) },
  [C.STO_M]: { entry: false, stackLift: true, fn: storeMem(12) },
  [C.STO_N]: { entry: false, stackLift: true, fn: storeMem(13) },
  [C.STO_O]: { entry: false, stackLift: true, fn: storeMem(14) },
  [C.STO_P]: { entry: false, stackLift: true, fn: storeMem(15) },
  [C.STO_Q]: { entry: false, stackLift: true, fn: storeMem(16) },
  [C.STO_R]: { entry: false, stackLift: true, fn: storeMem(17) },
  [C.STO_S]: { entry: false, stackLift: true, fn: storeMem(18) },
  [C.STO_T]: { entry: false, stackLift: true, fn: storeMem(19) },
  [C.STO_U]: { entry: false, stackLift: true, fn: storeMem(20) },
  [C.STO_V]: { entry: false, stackLift: true, fn: storeMem(21) },
  [C.STO_W]: { entry: false, stackLift: true, fn: storeMem(22) },
  [C.STO_X]: { entry: false, stackLift: true, fn: storeMem(23) },
  [C.STO_Y]: { entry: false, stackLift: true, fn: storeMem(24) },
  [C.STO_Z]: { entry: false, stackLift: true, fn: storeMem(25) },

  [C.RCL_A]: { entry: false, stackLift: true, fn: recallMem(0) },
  [C.RCL_B]: { entry: false, stackLift: true, fn: recallMem(1) },
  [C.RCL_C]: { entry: false, stackLift: true, fn: recallMem(2) },
  [C.RCL_D]: { entry: false, stackLift: true, fn: recallMem(3) },
  [C.RCL_E]: { entry: false, stackLift: true, fn: recallMem(4) },
  [C.RCL_F]: { entry: false, stackLift: true, fn: recallMem(5) },
  [C.RCL_G]: { entry: false, stackLift: true, fn: recallMem(6) },
  [C.RCL_H]: { entry: false, stackLift: true, fn: recallMem(7) },
  [C.RCL_I]: { entry: false, stackLift: true, fn: recallMem(8) },
  [C.RCL_J]: { entry: false, stackLift: true, fn: recallMem(9) },
  [C.RCL_K]: { entry: false, stackLift: true, fn: recallMem(10) },
  [C.RCL_L]: { entry: false, stackLift: true, fn: recallMem(11) },
  [C.RCL_M]: { entry: false, stackLift: true, fn: recallMem(12) },
  [C.RCL_N]: { entry: false, stackLift: true, fn: recallMem(13) },
  [C.RCL_O]: { entry: false, stackLift: true, fn: recallMem(14) },
  [C.RCL_P]: { entry: false, stackLift: true, fn: recallMem(15) },
  [C.RCL_Q]: { entry: false, stackLift: true, fn: recallMem(16) },
  [C.RCL_R]: { entry: false, stackLift: true, fn: recallMem(17) },
  [C.RCL_S]: { entry: false, stackLift: true, fn: recallMem(18) },
  [C.RCL_T]: { entry: false, stackLift: true, fn: recallMem(19) },
  [C.RCL_U]: { entry: false, stackLift: true, fn: recallMem(20) },
  [C.RCL_V]: { entry: false, stackLift: true, fn: recallMem(21) },
  [C.RCL_W]: { entry: false, stackLift: true, fn: recallMem(22) },
  [C.RCL_X]: { entry: false, stackLift: true, fn: recallMem(23) },
  [C.RCL_Y]: { entry: false, stackLift: true, fn: recallMem(24) },
  [C.RCL_Z]: { entry: false, stackLift: true, fn: recallMem(25) },
}