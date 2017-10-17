import math from 'mathjs'
import K from '../keyCodes'
import { letterToIndex } from './memory'

const goto = state => {
  const { ip } = state.programMemory[state.ip - 1]
  return { ...state, ip }
}

const dsle = (state, operand) => loopConditional(state, operand, K.DSLE)
const isgt = (state, operand) => loopConditional(state, operand, K.ISGT)

const loopConditional = (() => {
  const memo = {}
  return (state, operand, keyCode) => {
    const index = letterToIndex(operand)
    const { memory } = state
    let { ip } = state
    const value = memory[index]
    if (value < 0) {
      throw new Error('invalid counter value')
    }
    const [intPart, fracPart] = value.toString().split('.')
    let counter = parseInt(intPart, 10)
    let finalValue = 0
    let increment = 1
    if (fracPart) {
      if (memo[fracPart]) {
        [finalValue, increment] = memo[fracPart]
      }
      else {
        if (fracPart.length !== 3 && fracPart.length !== 5) {
          return { ...state, error: new Error(`invalid loop-control: ${value}`) }
        }
        finalValue = parseInt(fracPart.slice(0, 3), 10)
        if (fracPart.length === 5) {
          increment = parseInt(fracPart.slice(3), 10)
        }
        memo[fracPart] = [finalValue, increment]
      }
    }

    if (keyCode === K.DSLE) {
      counter -= increment
      ip = counter <= finalValue ? ip + 1 : ip
    }
    else {
      counter += increment
      ip = counter > finalValue ? ip + 1 : ip
    }
    memory[index] = parseFloat(`${counter}.${fracPart}`)
    return { ...state, memory: [...memory], ip }
  }
})()

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