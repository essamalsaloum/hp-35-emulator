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

  execute(state, instruction) {
    const { opCode, operand } = instruction
    const microCode = this.instructionSet[opCode]
    if (!microCode) {
      throw new Error(`alu: not implemented [${opCode}]`)
    }
    const { stackLift, fn } = microCode
    return {
      ...fn(state, operand),
      stackLift,
      entry: false
    }
  }
}
