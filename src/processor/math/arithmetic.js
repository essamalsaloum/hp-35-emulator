import * as C from '../keyCodes'

export default {
  [C.ADD]: { arity: 2, fn: (x, y) => y + x },
  [C.SUB]: { arity: 2, fn: (x, y) => y - x },
  [C.MUL]: { arity: 2, fn: (x, y) => y * x },
  [C.DIV]: { arity: 2, fn: (x, y) => y / x },
  [C.RECIPROCAL]: { arity: 1, fn: x => 1 / x }
}
