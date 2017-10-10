import K from '../keyCodes'
import { formatNumber, MAX_SIGNIFICANT_DIGITS } from '../../cpu/util'

const splitNumber = buffer => {
  const matches = buffer.match(/^([-]?[.0-9]+)(?:e([+-]?[0-9]+))?$/)
  if (!matches) {
    return [buffer, '']
  }
  const [, mantissa, exponent = ''] = matches
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
    } else if (/^[+-]\d{1,2}$/.test(exponent)) {
      exponent += digit
    }
  } else {
    if (mantissa === '0') {
      mantissa = digit
    } else if (mantissa === '-0') {
      mantissa = '-' + digit
    } else {
      mantissa += digit
    }
    const maxMantissaLength = MAX_SIGNIFICANT_DIGITS +
      (mantissa.startsWith('-') ? 1 : 0) +
      (mantissa.includes('.') ? 1 : 0)
    mantissa = mantissa.slice(0, maxMantissaLength)
  }

  buffer = joinNumber(mantissa, exponent)
  const stack = bufferToStack(buffer, state.stack)

  const error = Number.isFinite(stack[0]) ? null : { message: 'invalid data' }

  return {
    ...state,
    stack,
    buffer,
    error,
    entry: true
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
    stack: bufferToStack(buffer, state.stack),
    entry: true
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
    stack: bufferToStack(buffer, state.stack),
    entry: true
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

const del = state => {
  if (!state.entry) {
    return cancel(state)
  }
  if (state.error) {
    return { ...state, error: null }
  }

  let [mantissa, exponent] = splitNumber(state.buffer)
  if (exponent) {
    exponent = exponent.slice(0, -1)
    exponent = /^[+-]$/.test(exponent) ? '' : exponent
  } else {
    mantissa = mantissa.slice(0, -1)
    mantissa = mantissa.length === 0 || mantissa === '-' ? '0' : mantissa
  }

  const buffer = joinNumber(mantissa, exponent)
  const stack = bufferToStack(buffer, state.stack)

  return {
    ...state,
    stack,
    buffer,
    stackLift: false,
    entry: true
  }
}

const cancel = state => {
  if (state.error) {
    return { ...state, error: null }
  }
  const [, y, z, t] = state.stack
  return {
    ...state,
    stack: [0, y, z, t],
    buffer: '0',
    stackLift: false,
    entry: true
  }
}

const pi = state => {
  const pi = Math.PI
  const [x, y, z] = state.stack
  return {
    ...state,
    stack: [pi, x, y, z],
    buffer: formatNumber(pi),
    entry: false
  }
}

export default {
  [K.CHS]: { stackLift: null, fn: changeSign },
  [K.DOT]: { stackLift: false, fn: decimal },
  [K.D0]: { stackLift: false, fn: digit('0') },
  [K.D1]: { stackLift: false, fn: digit('1') },
  [K.D2]: { stackLift: false, fn: digit('2') },
  [K.D3]: { stackLift: false, fn: digit('3') },
  [K.D4]: { stackLift: false, fn: digit('4') },
  [K.D5]: { stackLift: false, fn: digit('5') },
  [K.D6]: { stackLift: false, fn: digit('6') },
  [K.D7]: { stackLift: false, fn: digit('7') },
  [K.D8]: { stackLift: false, fn: digit('8') },
  [K.D9]: { stackLift: false, fn: digit('9') },
  [K.DEL]: { stackLift: false, fn: del },
  [K.EEX]: { stackLift: false, fn: enterExponent },
  [K.PI]: { stackLift: true, fn: pi },
  [K.CANCEL]: { stackLift: false, fn: cancel },
}