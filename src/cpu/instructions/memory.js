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

const memClr = (state, operand) => {
  const index = letterToIndex(operand)
  const { memory } = state
  memory[index] = null
  return {
    ...state,
    memory: [...memory]
  }
}

const memClrAll = state => ({
  ...state,
  memory: []
})

export default {
  [K.STO]: store,
  [K.RCL]: recall,
  [K.MEM_CLR]: memClr,
  [K.MEM_CLR_ALL]: memClrAll,
  [K.RCL_ADD]: recallFn(math.add),
  [K.RCL_SUB]: recallFn(math.subtract),
  [K.RCL_MUL]: recallFn(math.multiply),
  [K.RCL_DIV]: recallFn(math.divide),
  [K.STO_ADD]: storeFn(math.add),
  [K.STO_SUB]: storeFn(math.subtract),
  [K.STO_MUL]: storeFn(math.multiply),
  [K.STO_DIV]: storeFn(math.divide),
  [K.MEM_SWAP]: swapMem,
}