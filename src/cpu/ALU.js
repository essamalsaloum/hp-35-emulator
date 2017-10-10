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

  execute(state, keyCode) {
    const microCode = this.instructionSet[keyCode]
    if (!microCode) {
      throw new Error(`alu: not implemented [${keyCode}]`)
    }
    const { stackLift, fn } = microCode
    return {
      ...fn(state),
      stackLift,
      entry: false
    }
  }
}
