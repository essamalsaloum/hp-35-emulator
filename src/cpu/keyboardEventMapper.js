import C from '../cpu/keyCodes'

const keyCodeToOpcode = {
  '0': C.D0,
  '1': C.D1,
  '2': C.D2,
  '3': C.D3,
  '4': C.D4,
  '5': C.D5,
  '6': C.D6,
  '7': C.D7,
  '8': C.D8,
  '9': C.D9,
  '.': C.DOT,
  ',': C.DOT,
  '+': C.ADD,
  '-': C.SUB,
  '*': C.MUL,
  '/': C.DIV,
  '±': C.CHS,
  'e': C.EEX,
  Enter: C.ENTER,
  Backspace: C.CLX
}

export default keyboardEvent => keyCodeToOpcode[keyboardEvent.key]
