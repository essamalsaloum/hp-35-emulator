import C from './keyCodes'
import { inputInstructions } from './instructions/input'
import { stackInstructions } from './instructions/stack'
import { mathInstructions } from './instructions/math'
import store from '../store'
import * as util from './util'

const NUMERIC_CONSTANT_REGEX = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/

// const keyCodeAliases = {
//   '+': C.ADD,
//   '-': C.SUB,
//   '*': C.MUL,
//   '/': C.DIV,
//   'y^x': C.POW,
//   'x^2': C.SQR,
//   'Vx': C.SQRT,
//   'xVy': C.NTH_ROOT
// }

const isValidNumber = num => NUMERIC_CONSTANT_REGEX.test(num)
const isValidKeyCode = keyCode => isValidNumber(keyCode) || !!instructionSet[keyCode]
const isCalculatorError = ({ stack }) => isNaN(stack[0]) || !isFinite(stack[0])

const instructionSet = {
  ...inputInstructions,
  ...stackInstructions,
  ...mathInstructions
}

const listeners = new Set()

export function subscribe(listener) {
  listeners.add(listener)
  return {
    remove: () => listeners.delete(listener)
  }
}

function notify(keyCode) {
  for (const listener of listeners) {
    listener(keyCode)
  }
}

const liftStack = state => {
  const [x, y, z] = state.stack
  return {
    ...state,
    stack: [x, x, y, z]
  }
}

const enterNumber = (state, num) => {
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
export function execute(state, keyCode) {

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
    return enterNumber(state, parseFloat(keyCode))
  }

  const instruction = instructionSet[keyCode]
  if (!instruction) {
    // throw new Error(`execute: not implemented [${keyCode}]`)
    console.error(`execute: not implemented [${keyCode}]`)
    return state
  }

  const { entry, stackLift, fn } = instruction

  if (entry) {
    state = state.stackLift === true ? liftStack(state) : state
  }

  const newState = fn(state)

  const errorState = isCalculatorError(newState) ? {
    buffer: 'Error',
    running: false
  } : {}

  if (!(isCalculatorError(newState) || entry)) {
    if (state.entry) {
      notify(util.formatNumber(state.stack[0]))
    }
    if (keyCode !== C.ENTER) {
      notify(keyCode)
    }
  }

  return {
    ...newState,
    entry: entry !== null ? entry : state.entry,
    stackLift: stackLift !== null ? stackLift : state.stackLift,
    ...errorState
  }
}

const executeYield = (keyCode) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const state = store.getState()
      if (state.running) {
        store.setState(execute(state, keyCode))
      }
      resolve()
    })
  })
}

export function runProg(keyCodes) {
  return keyCodes.reduce((promise, keyCode) => promise.then(() => {
    const { running } = store.getState()
    if (running) {
      return executeYield(keyCode)
    }
  }), Promise.resolve())
}

export function* createSingleStepIterator(keyCodes) {
  let index = 0
  for (const keyCode of keyCodes) {
    const state = execute(store.getState(), keyCode)
    store.setState(state)
    if (!state.running) {
      return
    }
    index += 1
    yield index
  }
}

function compileMarkdown(text) {
  const matches = text.match(/```[\s\S]+?```/g)
  let progText = ''
  if (matches) {
    progText = matches.reduce((buf, match) => {
      buf += match.slice(3, -3) + '\n'
      return buf
    }, '')
  }
  return compilePlainText(progText)
}

function compilePlainText(text) {
  const lines = text
    .toLowerCase()
    .split(/\n/)
    .map(line => line.trim())
    .filter(line => line !== '' && !line.startsWith('^'))

  return lines.reduce((acc, line) => {
    let error = false
    if (!line.startsWith('//')) {
      if (isValidKeyCode(line)) {
        acc.keyCodes.push(line)
      } else {
        error = true
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
      keyCodes: [],
      text: '',
      error: false
    })

}

export function compile(text) {
  return /\s*#/.test(text) ? compileMarkdown(text) : compilePlainText(text)
}

