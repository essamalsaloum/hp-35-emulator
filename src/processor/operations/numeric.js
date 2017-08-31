import * as C from '../opCodes'

const digit = digit => state => {
  if (!state.entry) {
    state.buffer = '0'
  }
  const buffer = state.buffer === '0' ? digit : state.buffer.concat(digit)
  return {
    stack: [parseFloat(buffer), ...state.stack.slice(1)],
    buffer
  }
}

const pi = state => {
  const x = Math.PI
  return {
    stack: [x, ...state.stack.slice(1)],
    buffer: x.toString()
  }
}

const decimal = state =>
  state.buffer.indexOf('.') !== -1 ? state : {
    ...state,
    buffer: state.buffer === '0' ? '.' : state.buffer.concat('.')
  }

export default {
  [C.DECIMAL]: { entry: true, stackLift: false, fn: decimal },
  [C.DIGIT_0]: { entry: true, stackLift: false, fn: digit('0') },
  [C.DIGIT_1]: { entry: true, stackLift: false, fn: digit('1') },
  [C.DIGIT_2]: { entry: true, stackLift: false, fn: digit('2') },
  [C.DIGIT_3]: { entry: true, stackLift: false, fn: digit('3') },
  [C.DIGIT_4]: { entry: true, stackLift: false, fn: digit('4') },
  [C.DIGIT_5]: { entry: true, stackLift: false, fn: digit('5') },
  [C.DIGIT_6]: { entry: true, stackLift: false, fn: digit('6') },
  [C.DIGIT_7]: { entry: true, stackLift: false, fn: digit('7') },
  [C.DIGIT_8]: { entry: true, stackLift: false, fn: digit('8') },
  [C.DIGIT_9]: { entry: true, stackLift: false, fn: digit('9') },
  [C.PI]: { entry: false, stackLift: true, fn: pi }
}