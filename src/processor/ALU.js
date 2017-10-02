import stack from './instructions/stack'
import math from './instructions/math'

export default class ALU {

  instructionSet = {
    ...stack,
    ...math
  }

  getInstructions() {
    return new Set(Object.keys(this.instructionSet))
  }

  liftStack(state) {
    const [x, y, z] = state.stack
    return {
      ...state,
      stack: [x, x, y, z]
    }
  }

  execute(state, opcode) {
    const microCode = this.instructionSet[opcode]
    if (!microCode) {
      throw new Error(`alu: not implemented [${opcode}]`)
    }
    const { stackLift, fn } = microCode
    return {
      ...fn(state),
      stackLift: stackLift !== null ? stackLift : state.stackLift
    }
  }
}
