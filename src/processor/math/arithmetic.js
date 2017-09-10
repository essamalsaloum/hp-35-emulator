import * as A from '../actionCodes'

export default {
  [A.ADD]: (x, y) => y + x,
  [A.SUB]: (x, y) => y - x,
  [A.MUL]: (x, y) => y * x,
  [A.DIV]: (x, y) => y / x,
  [A.RECIPROCAL]: x => 1 / x
}
