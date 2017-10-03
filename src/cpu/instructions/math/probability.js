import math from 'mathjs'
import C from '../../keyCodes'
import {monadic, dyadic} from './mathHelpers'

const fact = x => x < 0 || math.floor(x) !== x ? new Error('invalid data') : math.factorial(math.floor(x))
const nCr = (x, y) => {
  if (x < 0 || math.floor(x) !== x || y < 0 || math.floor(y) !== y || x > y) {
    return new Error('invalid data')
  }
  return math.combinations(y, x)
}
const nPr = (x, y) => {
  if (x < 0 || math.floor(x) !== x || y < 0 || math.floor(y) !== y || x > y) {
    return new Error('invalid data')
  }
  return math.permutations(y, x)
}

export default{
  [C.FACT]: monadic(fact),
  [C.NCR]: dyadic(nCr),
  [C.NPR]: dyadic(nPr),
}
