import * as A from '../processor/actionCodes'

const keyToKeyCode = {
  '0': A.DIGIT_0,
  '1': A.DIGIT_1,
  '2': A.DIGIT_2,
  '3': A.DIGIT_3,
  '4': A.DIGIT_4,
  '5': A.DIGIT_5,
  '6': A.DIGIT_6,
  '7': A.DIGIT_7,
  '8': A.DIGIT_8,
  '9': A.DIGIT_9,
  '.': A.DECIMAL,
  ',': A.DECIMAL,
  '+': A.ADD,
  '-': A.SUB,
  '*': A.MUL,
  '/': A.DIV,
  '±': A.CHS,
  Enter: A.ENTER,
  Backspace: A.CLX
}

export default keyboardEvent => keyToKeyCode[keyboardEvent.key]
