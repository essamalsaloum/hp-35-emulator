import C from './opcodes'
import ALU from './ALU'
import input from './instructions/input'
import memory from './instructions/memory'
import { formatNumber } from './util'
import {
  opcodesSelector,
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

  notify(newState, state, opcode) {
    const [x] = newState.stack
    if (!(x instanceof Error || newState.entry)) {
      if (state.entry) {
        this.notifyHelper(formatNumber(state.stack[0]))
      }
      if (opcode !== C.ENTER) {
        this.notifyHelper(opcode)
      }
    }
  }

  notifyHelper(opcode) {
    setTimeout(() => {
      for (const listener of this.listeners) {
        listener(opcode)
      }
    })
  }

  async startProgram(dispatch, getState) {
    const [x] = stackSelector(getState())
    if (x instanceof Error) {
      return
    }

    const opcodes = opcodesSelector(getState())
    let interrupted = false
    dispatch(setRunFlag())
    while (ipSelector(getState()) < opcodes.length && !interrupted) {
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
        const opcodes = opcodesSelector(getState())
        const ip = ipSelector(getState())
        const opcode = opcodes[ip]
        let processor = processorSelector(getState())
        processor = this.execute(processor, opcode)
        dispatch(updateProcessorState({ ...processor, ip: ip + 1 }))
        this.timeoutID = null
        resolve()
      }, delay)
    })
  }

  execute(state, opcode) {
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

    if (isValidNumber(opcode)) {
      const [x, y, z] = state.stack
      const num = parseFloat(opcode)
      return {
        ...state,
        stack: [num, x, y, z],
        stackLift: true,
        buffer: formatNumber(num),
        entry: false
      }
    }

    const newState = this.alu.getInstructions().has(opcode)
      ? this.aluExecute(state, opcode)
      : this.inputExecute(state, opcode)

    this.notify(newState, state, opcode)

    return newState
  }

  aluExecute(state, opcode) {
    const newState = this.alu.execute(state, opcode)
    const [x] = newState.stack
    const buffer = x instanceof Error ? x.message : formatNumber(x)
    return { ...newState, buffer, entry: false }
  }

  inputExecute(state, opcode) {
    const microCode = this.instructionSet[opcode]
    if (!microCode) {
      console.error(`controlUnit: not implemented [${opcode}]`)
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

  isValidInstruction(opcode) {
    return isValidNumber(opcode) || this.validInstructions.has(opcode)
  }
}