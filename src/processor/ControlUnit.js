import ALU from './ALU'
import { inputInstructions } from './instructions/input'
import { keyCodesSelector } from '../ducks/program'
import { setProcessorState, processorStateSelector } from '../ducks/processor'
import { formatNumber } from './util'

const NUMERIC_REGEX = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/
const isValidNumber = num => NUMERIC_REGEX.test(num)

export default class ControlUnit {

  alu = new ALU()
  timeoutID = null

  instructionSet = {
    ...inputInstructions,
  }

  validOpCodes = new Set([...Object.keys(this.instructionSet), ...this.alu.getOpcodes()])

  executeNext(store, delay) {
    return new Promise(resolve => {
      this.timeoutID = setTimeout(() => {
        const state = store.getState()
        const keyCodes = keyCodesSelector(state)
        let aluState = processorStateSelector(state)
        const { ip } = aluState
        const keyCode = keyCodes[ip]
        aluState = this.execute(aluState, keyCode)
        store.dispatch(setProcessorState({ ...aluState, ip: ip + 1 }))
        this.timeoutID = null
        resolve()
      }, delay)
    })
  }

  stopProgram() {
    if (this.timeoutID !== null) {
      clearTimeout(this.timeoutID)
      this.timeoutID = null
    }
  }

  execute(state, keyCode) {
    const [x, y, z, t] = state.stack
    if (x instanceof Error) {
      return {
        stack: [0, y, z, t],
        buffer: '0',
        running: false,
        stackLift: false,
        entry: false
      }
    }

    if (isValidNumber(keyCode)) {
      return this.enterNumber(state, parseFloat(keyCode))
    }

    return this.alu.getOpcodes().has(keyCode)
      ? this.aluExecute(state, keyCode)
      : this.inputExecute(state, keyCode)
  }

  enterNumber = (state, num) => {
    const [x, y, z] = state.stack
    return {
      ...state,
      stack: [num, x, y, z],
      buffer: formatNumber(num),
      entry: false,
      stackLift: true
    }
  }

  aluExecute(state, keyCode) {
    const newState = this.alu.execute(state, keyCode)
    const [x] = newState.stack
    const buffer = x instanceof Error ? x.message : formatNumber(x)
    return { ...newState, buffer }
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