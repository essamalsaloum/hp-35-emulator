import C from './keyCodes'
import ALU from './ALU'
import input from './instructions/input'
import memory from './instructions/memory'
import { formatNumber } from './util'
import {
  keyCodesSelector,
  ipSelector,
  resetIP,
  runFlagSelector,
  setRunFlag,
  clearRunFlag,
  processorStateSelector,
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

  validOpCodes = new Set([...Object.keys(this.instructionSet), ...this.alu.getOpcodes()])

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
      if (keyCode !== C.ENTER) {
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
    const [x] = processorStateSelector(getState()).stack
    if (x instanceof Error) {
      return
    }

    const keyCodes = keyCodesSelector(getState())
    let interrupted = false
    dispatch(setRunFlag())
    while (ipSelector(getState()) < keyCodes.length && !interrupted) {
      if (runFlagSelector(getState())) {
        await this.executeNext(dispatch, getState, delayedFlagSelector(getState()) ? DELAY : 0)
        const [x] = processorStateSelector(getState()).stack
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
        const keyCodes = keyCodesSelector(getState())
        const ip = ipSelector(getState())
        const keyCode = keyCodes[ip]
        let processor = processorStateSelector(getState())
        processor = this.execute(processor, keyCode)
        dispatch(updateProcessorState({ ...processor, ip: ip + 1 }))
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
        runFlag: false,
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

    const newState = this.alu.getOpcodes().has(keyCode)
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
    const instruction = this.instructionSet[keyCode]
    if (!instruction) {
      console.error(`controlUnit: not implemented [${keyCode}]`)
      return state
    }

    const { entry, stackLift, fn } = instruction
    if (entry) {
      state = state.stackLift === true ? this.alu.liftStack(state) : state
    }

    return {
      ...fn(state),
      entry: entry !== null ? entry : state.entry,
      stackLift: stackLift !== null ? stackLift : state.stackLift
    }
  }

  isValidKeyCode(keyCode) {
    return isValidNumber(keyCode) || this.validOpCodes.has(keyCode)
  }
}