import K from './keyCodes'
import ALU from './ALU'
import input from './instructions/input'
import memory from './instructions/memory'
import { liftStack } from './instructions/stack'
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

const DELAY = 500

const NUMERIC_REGEX = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/
const isNumeric = num => NUMERIC_REGEX.test(num)

const stackLiftCancelers = new Set([K.DEL, K.CANCEL])

export default class ControlUnit {
  alu = new ALU()
  timeoutID = null
  enterSeen = false

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

  // TODO: fix ENTER key processing

  notify(newState, oldState, keyCode) {
    if (newState.error) {
      return
    }

    if (oldState.entry && !newState.entry) {
      this.emit(formatNumber(oldState.stack[0]))
    }

    if (!newState.entry && newState.stackLift) {
      this.emit(keyCode)
    }

    if (keyCode === K.ENTER) {
      if (this.enterSeen || oldState.stackLift) {
        this.emit(K.ENTER)
      }
      this.enterSeen = true
    } else {
      this.enterSeen = false
    }
  }

  emit(keyCode) {
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
        await this.executeNext(dispatch, getState, isDelayedSelector(getState()) ? DELAY : 0)
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
        const keyCode = keyCodes[ip]
        let state = cpuSelector(getState())
        state = this.execute(state, keyCode)
        dispatch(updateState({ ...state, ip: ip + 1 }))
        this.timeoutID = null
        resolve()
      }, delay)
    })
  }

  execute(state, keyCode) {
    if (state.error && !(keyCode === K.DEL || keyCode === K.CLR || keyCode === K.CANCEL)) {
      return state
    }

    if (isNumeric(keyCode)) {
      const [x, y, z] = state.stack
      const num = parseFloat(keyCode)
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

    const newState = this.alu.getInstructions().has(keyCode)
      ? this.aluExecute(state, keyCode)
      : this.inputExecute(state, keyCode)

    this.notify(newState, state, keyCode)

    return newState
  }

  aluExecute(state, keyCode) {
    const newState = this.alu.execute(state, keyCode)
    const buffer = formatNumber(newState.stack[0])
    return { ...newState, buffer, entry: false }
  }

  inputExecute(state, keyCode) {
    const microCode = this.instructionSet[keyCode]
    if (!microCode) {
      console.error(`controlUnit: not implemented '${keyCode}'`)
      return state
    }

    const { stackLift: nextStackLift, fn } = microCode
    const { stackLift } = state
    state = stackLift && !stackLiftCancelers.has(keyCode) ? liftStack(state) : state

    state = fn(state)
    const { stack, buffer } = state
    const [x] = stack

    return {
      ...state,
      buffer: state.entry ? buffer : formatNumber(x),
      stackLift: nextStackLift !== null ? nextStackLift : stackLift
    }
  }

  isValidInstruction(keyCode) {
    return isNumeric(keyCode) || this.validInstructions.has(keyCode)
  }
}