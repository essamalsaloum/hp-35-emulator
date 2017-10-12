import math from 'mathjs'
import K from '../../keyCodes'
import { monadic, dyadic, dyadic2 } from './mathHelpers'

const div = (x, y) => x === 0 ? new Error('division by 0') : y / x
const inv = x => x === 0 ? new Error('division by 0') : 1 / x
const pct = (x, y) => x * y / 100
const pctChg = (x, y) => (x - y) * (100 / y)


export default {
  [K.ADD]: dyadic(math.add),
  [K.DIV]: dyadic(div),
  [K.INTG]: monadic(math.floor),
  [K.INV]: monadic(inv),
  [K.IP]: monadic(math.fix),
  [K.IP]: monadic(math.floor),
  [K.MUL]: dyadic(math.multiply),
  [K.PCT]: dyadic2(pct),
  [K.PCTCHG]: dyadic2(pctChg),
  [K.SUB]: dyadic(math.subtract),
}
