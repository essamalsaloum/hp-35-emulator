import math from 'mathjs'
import K from '../../keyCodes'
import { monadic, dyadic } from './mathHelpers'

const fact = x => {
  if (x < 0 ) {
    return new Error('invalid x')
  }
  x = math.factorial(x)
  return Number.isFinite(x) ? x : new Error('overflow')
}

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

export default {
  [K.FACT]: monadic(fact),
  [K.NCR]: dyadic(nCr),
  [K.NPR]: dyadic(nPr),
}
