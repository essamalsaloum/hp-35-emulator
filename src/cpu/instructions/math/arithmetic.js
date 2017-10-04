import math from 'mathjs'
import C from '../../keyCodes'
import { monadic, dyadic, dyadic2 } from './mathHelpers'

const div = (y, x) => x === 0 ? new Error('division by 0') : y / x
const inv = x => x === 0 ? new Error('division by 0') : 1 / x
const pct = (y, x) => y * x / 100
const pctChg = (y, x) => (x - y) * (100 / y)

export default {
  [C.ADD]: dyadic((y, x) => y + x),
  [C.DIV]: dyadic(div),
  [C.INTG]: monadic(math.floor),
  [C.INV]: monadic(inv),
  [C.IP]: monadic(math.fix),
  [C.IP]: monadic(math.floor),
  [C.MUL]: dyadic((y, x) => y * x),
  [C.PCT]: dyadic2(pct),
  [C.PCTCHG]: dyadic2(pctChg),
  [C.SUB]: dyadic((y, x) => y - x),
}
