import * as C from '../opCodes'
import { enter } from './stack'

const digit = digit => state => {
  if (state.computed) {
    state = enter(state)
  }
  if (!state.inputMode) {
    state.buffer = '0'
  }
  const buffer = state.buffer === '0' ? digit : state.buffer.concat(digit)
  return {
    stack: [parseFloat(buffer), ...state.stack.slice(1)],
    buffer,
    computed: false,
    inputMode: true
  }
}

const pi = state => {
  if (state.computed) {
    state = enter(state)
  }
  if (!state.inputMode) {
    state.buffer = '0'
  }
  const x = Math.PI
  return {
    stack: [x, ...state.stack.slice(1)],
    buffer: x.toString(),
    computed: true,
    inputMode: false
  }
}

const decimal = state =>
  state.buffer.indexOf('.') !== -1 ? state : {
    ...state,
    buffer: state.buffer === '0' ? '.' : state.buffer.concat('.')
  }

export default {
  [C.DECIMAL]: decimal,
  [C.DIGIT_0]: digit('0'),
  [C.DIGIT_1]: digit('1'),
  [C.DIGIT_2]: digit('2'),
  [C.DIGIT_3]: digit('3'),
  [C.DIGIT_4]: digit('4'),
  [C.DIGIT_5]: digit('5'),
  [C.DIGIT_6]: digit('6'),
  [C.DIGIT_7]: digit('7'),
  [C.DIGIT_8]: digit('8'),
  [C.DIGIT_9]: digit('9'),
  [C.PI]: pi
}