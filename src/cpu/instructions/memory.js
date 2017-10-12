import math from 'mathjs'
import K from '../keyCodes'

const CHAR_CODE_A = 'a'.charCodeAt(0)

const letterToIndex = operand => {
  const index = operand.charCodeAt(0) - CHAR_CODE_A
  if (index < 0 || index >= 26) {
    throw new Error('operand out of range')
  }
  return index
}

const store = (state, operand) => {
  const index = letterToIndex(operand)
  const { stack, memory } = state
  memory[index] = stack[0]
  return {
    ...state,
    memory: [...memory]
  }
}

const storeFn = fn => (state, operand) => {
  const index = letterToIndex(operand)
  const { stack, memory } = state
  memory[index] = fn(memory[index], stack[0])
  return {
    ...state,
    memory: [...memory]
  }
}

const recall = (state, operand) => {
  const index = letterToIndex(operand)
  const { stack, memory } = state
  const [x, y, z] = stack
  return {
    ...state,
    stack: [memory[index] || 0, x, y, z]
  }
}

const recallFn = fn => (state, operand) => {
  const index = letterToIndex(operand)
  const { stack, memory } = state
  const [x, ...rest] = stack
  return {
    ...state,
    stack: [fn(x, memory[index]), ...rest]
  }
}

const swapMem = (state, operand) => {
  const index = letterToIndex(operand)
  const { stack, memory } = state
  const [x, ...rest] = stack
  const memValue = memory[index]
  memory[index] = x
  return {
    ...state,
    stack: [memValue, ...rest],
    memory: [...memory]
  }

}

export default {
  [K.STO]: { stackLift: false, fn: store },
  [K.RCL]: { stackLift: true, fn: recall },
  [K.RCL_ADD]: {stackLift: false, fn: recallFn(math.add)},
  [K.RCL_SUB]: {stackLift: false, fn: recallFn(math.subtract)},
  [K.RCL_MUL]: {stackLift: false, fn: recallFn(math.multiply)},
  [K.RCL_DIV]: {stackLift: false, fn: recallFn(math.divide)},
  [K.STO_ADD]: {stackLift: false, fn: storeFn(math.add)},
  [K.STO_SUB]: {stackLift: false, fn: storeFn(math.subtract)},
  [K.STO_MUL]: {stackLift: false, fn: storeFn(math.multiply)},
  [K.STO_DIV]: {stackLift: false, fn: storeFn(math.divide)},
  [K.MEM_SWAP]: {stackLift: false, fn: swapMem},
}