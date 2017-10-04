import math from 'mathjs'
import C from '../../keyCodes'
import { monadic, dyadic } from './mathHelpers'

const fact = x => {
  if (x < 0 || math.floor(x) !== x) {
    return new Error('invalid data')
  }
  x = math.factorial(math.floor(x))
  return Number.isFinite(x) ? x : new Error('overflow')
}

const nCr = (y, x) => {
  if (x < 0 || math.floor(x) !== x || y < 0 || math.floor(y) !== y || x > y) {
    return new Error('invalid data')
  }
  return math.combinations(y, x)
}
const nPr = (y, x) => {
  if (x < 0 || math.floor(x) !== x || y < 0 || math.floor(y) !== y || x > y) {
    return new Error('invalid data')
  }
  return math.permutations(y, x)
}

export default {
  [C.FACT]: monadic(fact),
  [C.NCR]: dyadic(nCr),
  [C.NPR]: dyadic(nPr),
}
