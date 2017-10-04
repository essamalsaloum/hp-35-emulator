import K from '../../keyCodes'
import { monadic } from './mathHelpers'

const in2cm = x => x * 2.54
const cm2in = x => x / 2.54
const F2C = x => (x - 32) * 5 / 9
const C2F = x => x * 9 / 5 + 32

export default {
  [K.TO_CM]: monadic(in2cm),
  [K.TO_IN]: monadic(cm2in),
  [K.TO_DEGREE_C]: monadic(F2C),
  [K.TO_DEGREE_F]: monadic(C2F),
}
