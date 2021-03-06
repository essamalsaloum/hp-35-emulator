import K from './keyCodes'
import inputInstructions from './instructions/input'
import memoryInstructions from './instructions/memory'
import stackInstructions from './instructions/stack'
import mathInstructions from './instructions/math'
import branchInstructions from './instructions/branch'

import { formatNumber } from './util'
// import { playSuccessSound } from '../services/audio'
import {
  programMemorySelector,
  ipSelector,
  gotoProgramTop,
  isRunningSelector,
  programStarting,
  programStopping,
  cpuSelector,
  errorSelector,
  updateState,
  isDelayedSelector,
} from './reducer'

const stackLiftEnablingInstructions = {
  ...stackInstructions,
  ...mathInstructions,
  ...memoryInstructions,
}

const SLOW_EXECUTION_DELAY_MS = 500

const numericRegExp = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/
const isNumericString = num => numericRegExp.test(num)

const validInstructions = new Set([
  ...Object.keys(inputInstructions),
  ...Object.keys(stackLiftEnablingInstructions),
  ...Object.keys(branchInstructions),
])

const stackLiftDisablers = new Set([K.ENTER, K.DEL, K.CANCEL, K.CHS])

const liftStack = state => {
  const [x, y, z] = state.stack
  return { ...state, stack: [x, x, y, z] }
}

export default class ControlUnit {
  timeoutID = null
  lastOpCode = null
  listeners = new Set()

  subscribe(listener) {
    this.listeners.add(listener)
    return {
      remove: () => this.listeners.delete(listener)
    }
  }

  notify(keyCode) {
    setTimeout(() => {
      for (const listener of this.listeners) {
        listener(keyCode)
      }
    })
  }

  async startProgram(dispatch, getState) {
    if (errorSelector(getState())) {
      return
    }

    const instructions = programMemorySelector(getState())
    let interrupted = false
    dispatch(programStarting())
    while (ipSelector(getState()) < instructions.length && !interrupted) {
      if (isRunningSelector(getState())) {
        await this.executeNext(dispatch, getState, isDelayedSelector(getState()) ? SLOW_EXECUTION_DELAY_MS : 0)
        if (errorSelector(getState())) {
          interrupted = true
        }
      } else {
        interrupted = true
      }
    }
    dispatch(programStopping())
    if (!interrupted) {
      dispatch(gotoProgramTop())
    }
    // playSuccessSound()
  }

  stopProgram(dispatch) {
    if (this.timeoutID !== null) {
      clearTimeout(this.timeoutID)
      this.timeoutID = null
    }
    dispatch(programStopping())
  }

  executeNext(dispatch, getState, delay) {
    return new Promise(resolve => {
      this.timeoutID = setTimeout(() => {
        const instructions = programMemorySelector(getState())
        const ip = ipSelector(getState())
        const instruction = instructions[ip]
        let state = cpuSelector(getState())
        state = this.execute({ ...state, ip: state.ip + 1 }, instruction)
        dispatch(updateState(state))
        this.timeoutID = null
        resolve()
      }, delay)
    })
  }

  execute(state, instruction) {
    const { error, entry, stackLift } = state
    const { opCode, operand } = instruction

    if (error && opCode !== K.CANCEL) {
      return state
    }

    if (isNumericString(opCode)) {
      return this.enterNumber(state, opCode)
    }

    const branchFn = branchInstructions[opCode]
    if (branchFn) {
      return branchFn(state, operand)
    }

    const inputFn = inputInstructions[opCode]
    if (inputFn) {
      if (stackLift && !error && !entry && !stackLiftDisablers.has(instruction)) {
        state = liftStack(state)
      }
      if (opCode === K.ENTER) {
        this.notify(entry ? state.stack[0] : K.ENTER)
      }
      return inputFn(state)
    }

    const stackLiftEnablingFn = stackLiftEnablingInstructions[opCode]
    if (stackLiftEnablingFn) {
      if (entry) {
        this.notify(state.stack[0])
      }
      if (this.lastOpCode === K.ENTER) {
        this.notify(K.ENTER)
      }
      this.notify(instruction)
      state = stackLiftEnablingFn(state, operand)
      const [x] = state.stack
      const buffer = formatNumber(x)
      this.lastOpCode = opCode
      return { ...state, buffer, stackLift: true, entry: false }
    }

    console.error(`controlUnit: not implemented '${instruction}'`)
    return state
  }

  enterNumber(state, numericString) {
    const [x, y, z] = state.stack
    const num = parseFloat(numericString)
    if (!Number.isFinite(num)) {
      return {
        ...state,
        error: { message: 'range error' }
      }
    }
    return {
      ...state,
      stack: [num, x, y, z],
      stackLift: true,
      buffer: formatNumber(num),
      entry: false
    }

  }

  isValidInstruction(keyCode) {
    return isNumericString(keyCode) || validInstructions.has(keyCode)
  }
}