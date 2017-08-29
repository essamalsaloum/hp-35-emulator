import * as C from '../opCodes'

export default {
  [C.ADD]: { arity: 2, fn: (x, y) => y + x },
  [C.SUB]: { arity: 2, fn: (x, y) => y - x },
  [C.MUL]: { arity: 2, fn: (x, y) => y * x },
  [C.DIV]: { arity: 2, fn: (x, y) => y / x },
  [C.RECIPROC]: { arity: 1, fn: x => 1 / x },
  [C.CHS]: { arity: 1, fn: x => -x }
}
