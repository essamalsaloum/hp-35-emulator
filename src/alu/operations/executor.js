import numeric from './numeric'
import stack from './stack'
import math from './math'

const reducers = Object.assign({},
  numeric,
  stack,
  math
)

export const execute = opCode => state => {
  const reducer = reducers[opCode]
  if (!reducer) {
    console.error(`execute: not implemented [${opCode}]`)
    return state
  }
  return reducer(state)
}

export default execute