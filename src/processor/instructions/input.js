import * as C from '../keyCodes'

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
      exponent = '+' + digit
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

  const [, y, z, t] = state.stack
  const x = parseFloat(buffer)
  return {
    ...state,
    stack: [x, y, z, t],
    buffer
  }
}

const decimal = state => {
  const buffer = state.entry ? state.buffer : '0'
  return buffer.indexOf('.') !== -1 ? state : {
    ...state,
    buffer: buffer === '0' ? '.' : buffer.concat('.'),
    stack: [parseFloat(buffer), ...state.stack.slice(1)],
  }
}

const enterExponent = state => {
  const buffer = state.entry ? state.buffer : '0'
  if (buffer.indexOf('e') !== -1 || buffer === '.') {
    return state
  }
  const [, y, z, t] = state.stack
  const x = parseFloat(buffer)
  return {
    ...state,
    buffer: buffer === '0' ? '1e+0' : buffer.concat('e+0'),
    stack: [x, y, z, t]
  }
}

const changeSign = state => {
  const [x] = state.stack
  if (x === 0) {
    return state
  }

  let [mantissa, exponent] = splitNumber(state.buffer)
  if (exponent) {
    const sign = exponent.startsWith('-') ? '+' : '-'
    exponent = sign + exponent.slice(1)
  } else {
    mantissa = mantissa.startsWith('-') ? mantissa.slice(1) : '-'.concat(mantissa)
  }

  const [, y, z, t] = state.stack
  const buffer = joinNumber(mantissa, exponent)

  return {
    ...state,
    buffer,
    stack: [parseFloat(buffer), y, z, t]
  }
}

const pi = state => {
  const pi = Math.PI
  const [x, y, z] = state.stack
  return {
    ...state,
    stack: [pi, x, y, z],
    buffer: pi.toString()
  }
}

export default {
  [C.CHS]: { entry: null, stackLift: null, fn: changeSign },
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
  [C.EEX]: { entry: true, stackLift: false, fn: enterExponent },
  [C.PI]: { entry: false, stackLift: true, fn: pi }
}