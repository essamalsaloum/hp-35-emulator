import math from 'mathjs'
import K from '../keyCodes'
import { letterToIndex } from './memory'

const goto = state => {
  const { ip } = state.programMemory[state.ip - 1]
  return { ...state, ip }
}

const dsle = (state, operand) => {
  const index = letterToIndex(operand)
  const { memory } = state
  let { ip } = state
  let value = memory[index]
  if (value < 0) {
    throw new Error('invalid counter value')
  }
  let counter = math.round(value)
  const fraction = value - counter
  const finalValue = math.round(fraction * 1000)
  const increment = math.round(fraction * 100000 - finalValue * 100) || 1

  counter -= increment
  value = counter + fraction
  memory[index] = value

  ip = counter <= finalValue ? ip + 1 : ip
  return { ...state, memory: [...memory], ip }
}

const isgt = (state, operand) => {
  const index = letterToIndex(operand)
  const { memory } = state
  let { ip } = state
  let value = memory[index]
  if (value < 0) {
    throw new Error('invalid counter value')
  }
  let counter = math.round(value)
  const fraction = value - counter
  const finalValue = math.round(fraction * 1000)
  const increment = math.round(fraction * 100000 - finalValue * 100) || 1

  counter += increment
  value = counter + fraction
  memory[index] = value

  ip = counter > finalValue ? ip + 1 : ip
  return { ...state, memory: [...memory], ip }
}

const x_ne_y = (x, y) => math.compare(x, y) !== 0
const x_le_y = (x, y) => math.compare(x, y) <= 0
const x_lt_y = (x, y) => math.compare(x, y) < 0
const x_gt_y = (x, y) => math.compare(x, y) > 0
const x_ge_y = (x, y) => math.compare(x, y) >= 0
const x_eq_y = (x, y) => math.compare(x, y) === 0
const x_ne_0 = x => math.compare(x, 0) !== 0
const x_le_0 = x => math.compare(x, 0) <= 0
const x_lt_0 = x => math.compare(x, 0) < 0
const x_gt_0 = x => math.compare(x, 0) > 0
const x_ge_0 = x => math.compare(x, 0) >= 0
const x_eq_0 = x => math.compare(x, 0) === 0

const conditional = predicate => state => {
  const [x, y] = state.stack
  const condition = predicate(x, y)
  return condition ? state : { ...state, ip: state.ip + 1 }
}

export default {
  [K.GOTO]: goto,
  [K.DSLE]: dsle,
  [K.ISGT]: isgt,
  [K.X_NE_Y]: conditional(x_ne_y),
  [K.X_LE_Y]: conditional(x_le_y),
  [K.X_LT_Y]: conditional(x_lt_y),
  [K.X_GT_Y]: conditional(x_gt_y),
  [K.X_GE_Y]: conditional(x_ge_y),
  [K.X_EQ_Y]: conditional(x_eq_y),
  [K.X_NE_0]: conditional(x_ne_0),
  [K.X_LE_0]: conditional(x_le_0),
  [K.X_LT_0]: conditional(x_lt_0),
  [K.X_GT_0]: conditional(x_gt_0),
  [K.X_GE_0]: conditional(x_ge_0),
  [K.X_EQ_0]: conditional(x_eq_0),
}