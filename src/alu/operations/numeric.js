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
  digit0: digit('0'),
  digit1: digit('1'),
  digit2: digit('2'),
  digit3: digit('3'),
  digit4: digit('4'),
  digit5: digit('5'),
  digit6: digit('6'),
  digit7: digit('7'),
  digit8: digit('8'),
  digit9: digit('9'),
  pi,
  decimal
}