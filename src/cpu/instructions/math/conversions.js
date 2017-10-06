import math from 'mathjs'
import K from '../../keyCodes'
import { monadic } from './mathHelpers'

export const degreesToRadians = degrees => degrees * math.PI / 180.0
export const radiansToDegrees = radians => radians * 180.0 / math.PI

const C2F = x => x * 9 / 5 + 32
const F2C = x => (x - 32) * 5 / 9

const cm2in = x => x / 2.54
const in2cm = x => x * 2.54

const gallon2liter = x => x * 3.785411784
const liter2gallon = x => x / 3.785411784

const mile2km = x => x * 1.609344
const km2mile = x => x / 1.609344

const kg2lb = x => x * 2.20462262185
const lb2kg = x => x / 2.20462262185

export default {
  [K.TO_CM]: monadic(in2cm),
  [K.TO_DEG]: monadic(radiansToDegrees),
  [K.TO_DEGREE_C]: monadic(F2C),
  [K.TO_DEGREE_F]: monadic(C2F),
  [K.TO_GAL]: monadic(liter2gallon),
  [K.TO_IN]: monadic(cm2in),
  [K.TO_KG]: monadic(lb2kg),
  [K.TO_KM]: monadic(mile2km),
  [K.TO_L]: monadic(gallon2liter),
  [K.TO_LB]: monadic(kg2lb),
  [K.TO_MILE]: monadic(km2mile),
  [K.TO_RAD]: monadic(degreesToRadians),
}
