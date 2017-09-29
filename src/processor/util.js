import math from 'mathjs'

export const formatNumber = num => math.format(num, {precision: 14})

export function liftStack(state) {
  const [x, y, z] = state.stack
  return {
    ...state,
    stack: [x, x, y, z]
  }
}
