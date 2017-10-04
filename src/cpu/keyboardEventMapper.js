import K from '../cpu/keyCodes'

const keyCodeToOpcode = {
  '0': K.D0,
  '1': K.D1,
  '2': K.D2,
  '3': K.D3,
  '4': K.D4,
  '5': K.D5,
  '6': K.D6,
  '7': K.D7,
  '8': K.D8,
  '9': K.D9,
  '.': K.DOT,
  ',': K.DOT,
  '+': K.ADD,
  '-': K.SUB,
  '*': K.MUL,
  '/': K.DIV,
  '±': K.CHS,
  'e': K.EEX,
  Enter: K.ENTER,
  Backspace: K.CLX
}

export default keyboardEvent => keyCodeToOpcode[keyboardEvent.key]
