import K from './keyCodes'
import ALU from './ALU'
import input from './instructions/input'
import memory from './instructions/memory'
import { formatNumber } from './util'
import {
  keyCodesSelector,
  ipSelector,
  gotoProgramTop,
  isRunningSelector,
  programStarting,
  programStopping,
  processorSelector,
  stackSelector,
  updateState,
  isDelayedSelector,
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

  notify(newState, state, keyCode) {
    const [x] = newState.stack
    if (!(x instanceof Error || newState.entry)) {
      if (state.entry) {
        this.notifyHelper(formatNumber(state.stack[0]))
      }
      if (keyCode !== K.ENTER) {
        this.notifyHelper(keyCode)
      }
    }
  }

  notifyHelper(keyCode) {
    setTimeout(() => {
      for (const listener of this.listeners) {
        listener(keyCode)
      }
    })
  }

  async startProgram(dispatch, getState) {
    const [x] = stackSelector(getState())
    if (x instanceof Error) {
      return
    }

    const keyCodes = keyCodesSelector(getState())
    let interrupted = false
    dispatch(programStarting())
    while (ipSelector(getState()) < keyCodes.length && !interrupted) {
      if (isRunningSelector(getState())) {
        await this.executeNext(dispatch, getState, isDelayedSelector(getState()) ? DELAY : 0)
        const [x] = stackSelector(getState())
        if (x instanceof Error) {
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
        const keyCodes = keyCodesSelector(getState())
        const ip = ipSelector(getState())
        const keyCode = keyCodes[ip]
        let cpu = processorSelector(getState())
        cpu = this.execute(cpu, keyCode)
        dispatch(updateState({ ...cpu, ip: ip + 1 }))
        this.timeoutID = null
        resolve()
      }, delay)
    })
  }

  execute(state, keyCode) {
    const [x, y, z, t] = state.stack
    if (x instanceof Error) {
      return {
        stack: [0, y, z, t],
        stackLift: false,
        buffer: '0',
        isRunning: false,
        entry: false
      }
    }

    if (isValidNumber(keyCode)) {
      const [x, y, z] = state.stack
      const num = parseFloat(keyCode)
      return {
        ...state,
        stack: [num, x, y, z],
        stackLift: true,
        buffer: formatNumber(num),
        entry: false
      }
    }

    const newState = this.alu.getInstructions().has(keyCode)
      ? this.aluExecute(state, keyCode)
      : this.inputExecute(state, keyCode)

    this.notify(newState, state, keyCode)

    return newState
  }

  aluExecute(state, keyCode) {
    const newState = this.alu.execute(state, keyCode)
    const [x] = newState.stack
    const buffer = x instanceof Error ? x.message : formatNumber(x)
    return { ...newState, buffer, entry: false }
  }

  inputExecute(state, keyCode) {
    const microCode = this.instructionSet[keyCode]
    if (!microCode) {
      console.error(`controlUnit: not implemented '${keyCode}'`)
      return state
    }

    const { entry, stackLift, fn } = microCode
    if (entry) {
      state = state.stackLift === true ? this.alu.liftStack(state) : state
    }

    const newState = fn(state)
    const {stack, buffer} = newState
    const [x] = stack

    return {
      ...newState,
      entry: entry !== null ? entry : state.entry,
      buffer: entry ? buffer : formatNumber(x),
      stackLift: stackLift !== null ? stackLift : state.stackLift
    }
  }

  isValidInstruction(keyCode) {
    return isValidNumber(keyCode) || this.validInstructions.has(keyCode)
  }
}