import K from './keyCodes'
import inputInstructions from './instructions/input'
import memoryInstructions from './instructions/memory'
import stackInstructions from './instructions/stack'
import mathInstructions from './instructions/math'

import { formatNumber } from './util'
// import { playSuccessSound } from '../services/audio'
import {
  keyCodesSelector,
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
  ...Object.keys(stackLiftEnablingInstructions)
])

const stackLiftDisablers = new Set([K.ENTER, K.DEL, K.CANCEL, K.CHS])

const liftStack = state => {
  const [x, y, z] = state.stack
  return { ...state, stack: [x, x, y, z] }
}

export default class ControlUnit {
  timeoutID = null
  lastKeyCode = null
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

    const keyCodes = keyCodesSelector(getState())
    let interrupted = false
    dispatch(programStarting())
    while (ipSelector(getState()) < keyCodes.length && !interrupted) {
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
        const keyCodes = keyCodesSelector(getState())
        const ip = ipSelector(getState())
        const keyCode = keyCodes[ip].toLowerCase()
        let state = cpuSelector(getState())
        state = this.execute(state, keyCode)
        dispatch(updateState({ ...state, ip: ip + 1 }))
        this.timeoutID = null
        resolve()
      }, delay)
    })
  }

  execute(state, keyCode) {
    const { error, entry, stackLift } = state

    if (error && keyCode !== K.CANCEL) {
      return state
    }

    if (isNumericString(keyCode)) {
      return this.enterNumber(state, keyCode)
    }

    const pos = keyCode.indexOf('.')
    let operand = null
    if (pos !== -1) {
      operand = keyCode.slice(pos + 1)
      keyCode = keyCode.slice(0, pos)
    }

    const inputFn = inputInstructions[keyCode]
    if (inputFn) {
      if (stackLift && !error && !entry && !stackLiftDisablers.has(keyCode)) {
        state = liftStack(state)
      }
      if (keyCode === K.ENTER) {
        this.notify(entry ? state.stack[0] : K.ENTER)
      }
      // this.lastKeyCode = keyCode
      return inputFn(state)
    }

    const stackLiftEnablingFn = stackLiftEnablingInstructions[keyCode]
    if (stackLiftEnablingFn) {
      if (entry) {
        this.notify(state.stack[0])
      }
      if (this.lastKeyCode === K.ENTER) {
        this.notify(K.ENTER)
      }
      this.notify(keyCode)
      state = stackLiftEnablingFn(state, operand)
      const [x] = state.stack
      const buffer = formatNumber(x)
      this.lastKeyCode = keyCode
      return { ...state, buffer, stackLift: true, entry: false }
    }

    console.error(`controlUnit: not implemented '${keyCode}'`)
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