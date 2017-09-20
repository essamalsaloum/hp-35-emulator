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
      console.log('state.stack[0]', state.stack[0])
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


const executeAsync = (keyCode) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const program = store.getState().program
      if (program.running) {
        const newProcessorState = execute(store.getState().processor, keyCode)
        store.setState({ processor: newProcessorState })
      }
      resolve()
    })
  })
}

export function runToCompletion() {
  const { program } = store.getState()
  store.setState({ program: { ...program, running: true } })
  const keyCodes = program.keyCodes.slice(program.nextIndex)
  keyCodes
    .reduce((promise, keyCode) => promise.then(() => {
      return executeAsync(keyCode)
    }), Promise.resolve())
    .then(() => {
      const { program } = store.getState()
      store.setState({ program: { ...program, running: false, nextIndex: 0 } })
    })
}

export function singleStep() {
  const { program } = store.getState()
  const { nextIndex, keyCodes } = program
  if (nextIndex < keyCodes.length) {
    executeAsync(keyCodes[nextIndex])
      .then(() => {
        store.setState({ program: { ...program, nextIndex: nextIndex + 1 } })
      })
  } else {
    store.setState({ program: { ...program, nextIndex: 0 } })
  }
}

export function* createSingleStepIterator(keyCodes) {
  let nextIndex = 0

  for (const keyCode of keyCodes) {
    const state = store.getState()
    const processor = execute(state.processor, keyCode)
    nextIndex += 1

    store.setState({
      processor: { ...processor },
      program: { ...state.program, nextIndex }
    })

    if (!state.program.running) {
      return
    }
    yield
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
      text: '',
      keyCodes: [],
      error: false
    })

}

export function compile(text) {
  return /\s*#/.test(text) ? compileMarkdown(text) : compilePlainText(text)
}
