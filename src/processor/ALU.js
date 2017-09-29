import stack from './instructions/stack'
import math from './instructions/math'

export default class ALU {

  instructionSet = {
    ...stack,
    ...math
  }

  getOpcodes() {
    return new Set(Object.keys(this.instructionSet))
  }

  liftStack(state) {
    const [x, y, z] = state.stack
    return {
      ...state,
      stack: [x, x, y, z]
    }
  }

  execute(state, opCode) {
    const instruction = this.instructionSet[opCode]
    if (!instruction) {
      throw new Error(`alu: not implemented [${opCode}]`)
    }
    const { stackLift, fn } = instruction
    return {
      ...fn(state),
      stackLift: stackLift !== null ? stackLift : state.stackLift
    }
  }
}
