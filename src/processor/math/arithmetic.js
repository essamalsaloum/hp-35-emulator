import * as C from '../keyCodes'

export default {
  [C.ADD]: (x, y) => y + x,
  [C.SUB]: (x, y) => y - x,
  [C.MUL]: (x, y) => y * x,
  [C.DIV]: (x, y) => y / x,
  [C.RECIPROCAL]: x => 1 / x
}
