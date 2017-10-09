import math from 'mathjs'

export const MAX_SIGNIFICANT_DIGITS = 14
export const formatNumber = num => math.format(num, {precision: MAX_SIGNIFICANT_DIGITS})
