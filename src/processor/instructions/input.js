import * as C from '../opCodes'


const splitNumber = buffer => {
  const parts = buffer.match(/^([-]?[.0-9]+)(?:e([+-]?[0-9]{1,2}))?$/)
  if (!parts) {
    return [buffer, '']
  }
  const [, mantissa, exponent = ''] = parts
  return [mantissa, exponent]
}

const joinNumber = (mantissa, exponent) => mantissa + (exponent ? 'e' + exponent : '')

const digit = digit => state => {
  let buffer = state.entry ? state.buffer : '0'
  let [mantissa, exponent] = splitNumber(buffer)

  if (exponent) {
    if (exponent === '+0') {
      exponent = '+'+ digit
    } else if (exponent === '-0') {
      exponent = '-' + digit
    } else if (/^[+-]?\d$/.test(exponent)) {
      exponent += digit
    }
  } else if (mantissa === '0') {
    mantissa = digit
  } else if (mantissa === '-0') {
    mantissa = '-' + digit
  } else {
    mantissa += digit
  }

  buffer = joinNumber(mantissa, exponent)

  return {
    stack: [parseFloat(buffer), ...state.stack.slice(1)],
    buffer
  }
}

const pi = state => {
  const pi = Math.PI
  const [x, ...rest] = state.stack
  return {
    stack: [pi, x, ...rest.slice(0, -1)],
    buffer: pi.toString()
  }
}

const decimal = state =>
  state.buffer.indexOf('.') !== -1 ? state : {
    ...state,
    buffer: state.buffer === '0' ? '.' : state.buffer.concat('.')
  }

const enterExponent = state => {
  if (state.buffer.indexOf('e') !== -1) {
    return state
  }
  return {
    ...state,
    buffer: state.buffer === '0' ? '1e+0' : state.buffer.concat('e+0')
  }
}

const changeSign = state => {
  let [mantissa, exponent] = splitNumber(state.buffer)
  if (exponent) {
    const sign = exponent.startsWith('-') ? '+'  : '-'
    exponent = sign + exponent.slice(1)
  } else {
    mantissa = mantissa.startsWith('-') ? mantissa.slice(1) : '-'.concat(mantissa)
  }

  const [, ...rest] = state.stack
  const buffer = joinNumber(mantissa, exponent)

  return {
    ...state,
    buffer,
    stack: [parseFloat(buffer), ...rest]
  }
}

export default {
  [C.CHS]: { entry: null, stackLift: null, fn: changeSign },
  [C.DECIMAL]: { entry: true, stackLift: null, fn: decimal },
  [C.DIGIT_0]: { entry: true, stackLift: null, fn: digit('0') },
  [C.DIGIT_1]: { entry: true, stackLift: null, fn: digit('1') },
  [C.DIGIT_2]: { entry: true, stackLift: null, fn: digit('2') },
  [C.DIGIT_3]: { entry: true, stackLift: null, fn: digit('3') },
  [C.DIGIT_4]: { entry: true, stackLift: null, fn: digit('4') },
  [C.DIGIT_5]: { entry: true, stackLift: null, fn: digit('5') },
  [C.DIGIT_6]: { entry: true, stackLift: null, fn: digit('6') },
  [C.DIGIT_7]: { entry: true, stackLift: null, fn: digit('7') },
  [C.DIGIT_8]: { entry: true, stackLift: null, fn: digit('8') },
  [C.DIGIT_9]: { entry: true, stackLift: null, fn: digit('9') },
  [C.EEX]: { entry: true, stackLift: null, fn: enterExponent },
  [C.PI]: { entry: false, stackLift: true, fn: pi }
}