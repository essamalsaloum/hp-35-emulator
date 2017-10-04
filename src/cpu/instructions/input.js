import K from '../keyCodes'
import * as util from '../../cpu/util'

const splitNumber = buffer => {
  const parts = buffer.match(/^([-]?[.0-9]+)(?:e([+-]?[0-9]{1,2}))?$/)
  if (!parts) {
    return [buffer, '']
  }
  const [, mantissa, exponent = ''] = parts
  return [mantissa, exponent]
}

const joinNumber = (mantissa, exponent) => mantissa + (exponent ? 'e' + exponent : '')

const bufferToStack = (buffer, stack) => {
  const [, y, z, t] = stack
  const x = parseFloat(buffer)
  return [x, y, z, t]
}

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

  return {
    ...state,
    buffer,
    stack: bufferToStack(buffer, state.stack)
  }
}

const decimal = state => {
  let buffer = state.entry ? state.buffer : '0'
  if (/[e.]/.test(buffer)) {
    return state
  }
  buffer += '.'
  return {
    ...state,
    buffer,
    stack: bufferToStack(buffer, state.stack)
  }
}

const enterExponent = state => {
  const buffer = state.entry ? state.buffer : '0'
  if (buffer.indexOf('e') !== -1 || buffer === '.') {
    return state
  }
  return {
    ...state,
    buffer: buffer === '0' ? '1e+0' : buffer.concat('e+0'),
    stack: bufferToStack(buffer, state.stack)
  }
}

const changeSign = state => {
  if (state.stack[0] === 0) {
    return state
  }

  let [mantissa, exponent] = splitNumber(state.buffer)
  if (exponent) {
    const sign = exponent.startsWith('-') ? '+' : '-'
    exponent = sign + exponent.slice(1)
  } else {
    mantissa = mantissa.startsWith('-') ? mantissa.slice(1) : '-'.concat(mantissa)
  }

  const buffer = joinNumber(mantissa, exponent)

  return {
    ...state,
    buffer,
    stack: bufferToStack(buffer, state.stack)
  }
}

const pi = state => {
  const pi = Math.PI
  const [x, y, z] = state.stack
  return {
    ...state,
    stack: [pi, x, y, z],
    buffer: util.formatNumber(pi)
  }
}

export default {
  [K.CHS]: { entry: null, stackLift: null, fn: changeSign },
  [K.DOT]: { entry: true, stackLift: false, fn: decimal },
  [K.D0]: { entry: true, stackLift: false, fn: digit('0') },
  [K.D1]: { entry: true, stackLift: false, fn: digit('1') },
  [K.D2]: { entry: true, stackLift: false, fn: digit('2') },
  [K.D3]: { entry: true, stackLift: false, fn: digit('3') },
  [K.D4]: { entry: true, stackLift: false, fn: digit('4') },
  [K.D5]: { entry: true, stackLift: false, fn: digit('5') },
  [K.D6]: { entry: true, stackLift: false, fn: digit('6') },
  [K.D7]: { entry: true, stackLift: false, fn: digit('7') },
  [K.D8]: { entry: true, stackLift: false, fn: digit('8') },
  [K.D9]: { entry: true, stackLift: false, fn: digit('9') },
  [K.EEX]: { entry: true, stackLift: false, fn: enterExponent },
  [K.PI]: { entry: false, stackLift: true, fn: pi }
}