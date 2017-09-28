import C from './keyCodes'
import aliases from './aliases'
import { inputInstructions } from './instructions/input'
import { stackInstructions } from './instructions/stack'
import { mathInstructions } from './instructions/math'
import store from '../reduxStore'
import { keyCodesSelector } from '../ducks/program'
import { setProcessorState, processorStateSelector } from '../ducks/processor'

import * as util from './util'

const NUMERIC_CONSTANT_REGEX = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/

const isValidNumber = num => NUMERIC_CONSTANT_REGEX.test(num)
const isCalculatorError = ({ stack }) => isNaN(stack[0]) || !isFinite(stack[0])

const instructionSet = {
  ...inputInstructions,
  ...stackInstructions,
  ...mathInstructions
}

class Processor {

  listeners = new Set()
  timeoutID = null
  history = []

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

  liftStack(state) {
    const [x, y, z] = state.stack
    return {
      ...state,
      stack: [x, x, y, z]
    }
  }

  enterNumber = (state, num) => {
    const [x, y, z] = state.stack
    return {
      ...state,
      stack: [num, x, y, z],
      buffer: util.formatNumber(num),
      entry: false,
      stackLift: true
    }
  }

  /*
    The  operations Enter, CLX and CLS disable stack lift.
    C number keyed in after one of these disabling operations writes over the number
    currently in the X–register. The Y–, Z– and T–registers remain unchanged.
  */

  execute(state, keyCode) {

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

    if (isValidNumber(keyCode)) {
      return this.enterNumber(state, parseFloat(keyCode))
    }

    const instruction = instructionSet[keyCode]
    if (!instruction) {
      // throw new Error(`execute: not implemented [${keyCode}]`)
      console.error(`execute: not implemented [${keyCode}]`)
      return state
    }

    const { entry, stackLift, fn } = instruction

    if (entry) {
      state = state.stackLift === true ? this.liftStack(state) : state
    }

    const newState = fn(state)

    const errorState = isCalculatorError(newState) ? {
      buffer: 'Error',
      running: false
    } : {}

    if (!(isCalculatorError(newState) || entry)) {
      if (state.entry) {
        this.notify(util.formatNumber(state.stack[0]))
      }
      if (keyCode !== C.ENTER) {
        this.notify(keyCode)
      }
    }

    return {
      ...newState,
      entry: entry !== null ? entry : state.entry,
      stackLift: stackLift !== null ? stackLift : state.stackLift,
      ...errorState
    }
  }

  executeNext(delay = 0) {
    return new Promise(resolve => {
      this.timeoutID = setTimeout(() => {
        const state = store.getState()
        const keyCodes = keyCodesSelector(state)
        let processorState = processorStateSelector(state)
        const { ip } = processorState
        processorState = this.execute(processorState, keyCodes[ip])
        store.dispatch(setProcessorState({ ...processorState, ip: ip + 1 }))
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

  compileMarkDownProgram(text) {
    const matches = text.match(/```[\s\S]+?```/g)
    let progText = ''
    if (matches) {
      progText = matches.reduce((buf, match) => {
        buf += match.slice(3, -3) + '\n'
        return buf
      }, '')
    }
    return this.compilePlainTextProgram(progText)
  }

  compilePlainTextProgram(text) {
    const instanceAliases = {}

    const lines = text
      .toLowerCase()
      .split(/\n/)
      .map(line => line.trim())
      .filter(line => line !== '' && !line.startsWith('^'))

    return lines.reduce((acc, line) => {
      let error = false
      if (!line.startsWith('//')) {
        const tokens = line.split(/\s+/)
        if (tokens.length === 3 && tokens[0] === 'alias') {
          instanceAliases[tokens[1]] = tokens[2]
        } else {
          line = instanceAliases[line] || aliases[line] || line
          if (this.isValidKeyCode(line)) {
            acc.keyCodes.push(line)
          } else {
            error = true
          }
        }
      }
      acc.text += line + '\n'
      if (error) {
        acc.error = true
        const len = line.length
        const indicator = len < 3 ? '^'.repeat(len) : `^${'_'.repeat(len - 2)}^`
        acc.text += `${indicator} ERROR\n`
      }
      return acc
    }, {
        text: '',
        keyCodes: [],
        error: false
      })

  }

  compileProgram(text) {
    return /\s*#/.test(text) ? this.compileMarkDownProgram(text) : this.compilePlainTextProgram(text)
  }

  isValidKeyCode(keyCode) {
    return isValidNumber(keyCode) || !!instructionSet[keyCode]
  }

}

export default new Processor()
