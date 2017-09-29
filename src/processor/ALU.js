import { stackInstructions } from './instructions/stack'
import { mathInstructions } from './instructions/math'

const isCalculatorError = ({ stack }) => isNaN(stack[0]) || !isFinite(stack[0])

export default class ALU {

  instructionSet = {
    ...stackInstructions,
    ...mathInstructions
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
    if (isCalculatorError(state)) {
      const [, y, z, t] = state.stack
      return {
        stack: [0, y, z, t],
        buffer: '0',
        running: false,
        stackLift: false,
        entry: false
      }
    }

    const instruction = this.instructionSet[opCode]
    if (!instruction) {
      throw new Error(`alu: not implemented [${opCode}]`)
    }

    const { entry, stackLift, fn } = instruction

    if (entry) {
      state = state.stackLift === true ? this.liftStack(state) : state
    }

    const newState = fn(state)

    const errorState = isCalculatorError(newState) ? {
      buffer: 'arithmetic error',
      running: false
    } : {}

    return {
      ...newState,
      entry: entry !== null ? entry : state.entry,
      stackLift: stackLift !== null ? stackLift : state.stackLift,
      ...errorState
    }
  }
}
