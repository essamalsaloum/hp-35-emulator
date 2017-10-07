import math from 'mathjs'
import K from '../../keyCodes'
import { monadic } from './mathHelpers'

export const degreesToRadians = degrees => degrees * math.PI / 180.0
export const radiansToDegrees = radians => radians * 180.0 / math.PI

const C2F = x => x * 9 / 5 + 32
const F2C = x => (x - 32) * 5 / 9

const cm2in = x => x / 2.54
const in2cm = x => x * 2.54

const gal2l = x => x * 3.785411784
const l2gal = x => x / 3.785411784

const mile2km = x => x * 1.609344
const km2mile = x => x / 1.609344

const lb2kg = x => x * 0.45359237
const kg2lb = x => x / 0.45359237

const yd2m = x => x * 0.9144
const m2yd = x => x / 0.9144

const ft2m = x => x * 0.3048
const m2ft = x => x / 0.3048

const oz2g = x => x * 31.1034768
const g2oz = x => x / 31.1034768

const distance = {
  [K.IN_TO_CM]: monadic(in2cm),
  [K.CM_TO_IN]: monadic(cm2in),
  [K.FT_TO_M]: monadic(ft2m),
  [K.M_TO_FT]: monadic(m2ft),
  [K.YD_TO_M]: monadic(yd2m),
  [K.M_TO_YD]: monadic(m2yd),
  [K.MILE_TO_KM]: monadic(mile2km),
  [K.KM_TO_MILE]: monadic(km2mile),
}

const weight = {
  [K.LB_TO_KG]: monadic(lb2kg),
  [K.KG_TO_LB]: monadic(kg2lb),
  [K.OZ_TO_G]: monadic(oz2g),
  [K.G_TO_OZ]: monadic(g2oz),
}
export default {
  ...distance,
  ...weight,

  [K.RAD_TO_DEG]: monadic(radiansToDegrees),
  [K.F_TO_C]: monadic(F2C),
  [K.C_TO_F]: monadic(C2F),
  [K.L_TO_GAL]: monadic(l2gal),
  [K.GAL_TO_L]: monadic(gal2l),
  [K.DEG_TO_RAD]: monadic(degreesToRadians),
}
