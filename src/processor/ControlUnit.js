import C from './keyCodes'
import ALU from './ALU'
import input from './instructions/input'
import memory from './instructions/memory'
import { formatNumber } from './util'
import {
  instructionsSelector,
  ipSelector,
  resetIP,
  runFlagSelector,
  setRunFlag,
  clearRunFlag,
  processorSelector,
  stackSelector,
  updateProcessorState,
  delayedFlagSelector,
} from './reducer'

const DELAY = 500

const NUMERIC_REGEX = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/
const isValidNumber = num => NUMERIC_REGEX.test(num)

export default class ControlUnit {
  alu = new ALU()
  timeoutID = null

  instructionSet = {
    ...input,
    ...memory
  }

  validInstructions = new Set([...Object.keys(this.instructionSet), ...this.alu.getInstructions()])

  listeners = new Set()

  subscribe(listener) {
    this.listeners.add(listener)
    return {
      remove: () => this.listeners.delete(listener)
    }
  }

  notify(newState, state, instruction) {
    const [x] = newState.stack
    if (!(x instanceof Error || newState.entry)) {
      if (state.entry) {
        this.notifyHelper(formatNumber(state.stack[0]))
      }
      if (instruction !== C.ENTER) {
        this.notifyHelper(instruction)
      }
    }
  }

  notifyHelper(instruction) {
    setTimeout(() => {
      for (const listener of this.listeners) {
        listener(instruction)
      }
    })
  }

  async startProgram(dispatch, getState) {
    const [x] = stackSelector(getState())
    if (x instanceof Error) {
      return
    }

    const instructions = instructionsSelector(getState())
    let interrupted = false
    dispatch(setRunFlag())
    while (ipSelector(getState()) < instructions.length && !interrupted) {
      if (runFlagSelector(getState())) {
        await this.executeNext(dispatch, getState, delayedFlagSelector(getState()) ? DELAY : 0)
        const [x] = stackSelector(getState())
        if (x instanceof Error) {
          interrupted = true
        }
      } else {
        interrupted = true
      }
    }
    dispatch(clearRunFlag())
    if (!interrupted) {
      dispatch(resetIP())
    }
  }

  stopProgram(dispatch) {
    if (this.timeoutID !== null) {
      clearTimeout(this.timeoutID)
      this.timeoutID = null
    }
    dispatch(clearRunFlag())
  }

  executeNext(dispatch, getState, delay) {
    return new Promise(resolve => {
      this.timeoutID = setTimeout(() => {
        const instructions = instructionsSelector(getState())
        const ip = ipSelector(getState())
        const instruction = instructions[ip]
        let processor = processorSelector(getState())
        processor = this.execute(processor, instruction)
        dispatch(updateProcessorState({ ...processor, ip: ip + 1 }))
        this.timeoutID = null
        resolve()
      }, delay)
    })
  }

  execute(state, instruction) {
    const [x, y, z, t] = state.stack
    if (x instanceof Error) {
      return {
        stack: [0, y, z, t],
        stackLift: false,
        buffer: '0',
        runFlag: false,
        entry: false
      }
    }

    if (isValidNumber(instruction)) {
      const [x, y, z] = state.stack
      const num = parseFloat(instruction)
      return {
        ...state,
        stack: [num, x, y, z],
        stackLift: true,
        buffer: formatNumber(num),
        entry: false
      }
    }

    const newState = this.alu.getInstructions().has(instruction)
      ? this.aluExecute(state, instruction)
      : this.inputExecute(state, instruction)

    this.notify(newState, state, instruction)

    return newState
  }

  aluExecute(state, instruction) {
    const newState = this.alu.execute(state, instruction)
    const [x] = newState.stack
    const buffer = x instanceof Error ? x.message : formatNumber(x)
    return { ...newState, buffer, entry: false }
  }

  inputExecute(state, instruction) {
    const microCode = this.instructionSet[instruction]
    if (!microCode) {
      console.error(`controlUnit: not implemented [${instruction}]`)
      return state
    }

    const { entry, stackLift, fn } = microCode
    if (entry) {
      state = state.stackLift === true ? this.alu.liftStack(state) : state
    }

    return {
      ...fn(state),
      entry: entry !== null ? entry : state.entry,
      stackLift: stackLift !== null ? stackLift : state.stackLift
    }
  }

  isValidInstruction(instruction) {
    return isValidNumber(instruction) || this.validInstructions.has(instruction)
  }
}