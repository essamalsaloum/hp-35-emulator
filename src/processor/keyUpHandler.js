import * as C from '../processor/keyCodes'

const keyToKeyCode = {
  '0': C.DIGIT_0,
  '1': C.DIGIT_1,
  '2': C.DIGIT_2,
  '3': C.DIGIT_3,
  '4': C.DIGIT_4,
  '5': C.DIGIT_5,
  '6': C.DIGIT_6,
  '7': C.DIGIT_7,
  '8': C.DIGIT_8,
  '9': C.DIGIT_9,
  '.': C.DECIMAL,
  ',': C.DECIMAL,
  '+': C.ADD,
  '-': C.SUB,
  '*': C.MUL,
  '/': C.DIV,
  '±': C.CHS,
  Enter: C.ENTER,
  Backspace: C.CLX
}

export default keyboardEvent => keyToKeyCode[keyboardEvent.key]
