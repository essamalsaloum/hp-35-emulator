import arithmetic from './math/arithmetic'
import transcendental from './math/transcendental'
import probability from './math/probability'
import conversions from './math/conversions'
import physicsConstants from './physicsConstants'

const funcs = {
  ...arithmetic,
  ...transcendental,
  ...probability,
  ...conversions,
  ...physicsConstants,
}

const compute = keyCode => state => {
  const fn = funcs[keyCode]
  if (!fn) {
    throw new Error(`math: not implemented [${keyCode}]`)
  }
  let { stack } = state
  stack = fn(stack)
  const [x] = stack
  if (typeof x === 'object' && x instanceof Error) {
    return {
      ...state,
      error: { message: x.message }
    }
  }
  if (!Number.isFinite(x)) {
    return {
      ...state,
      error: { message: 'range error' }
    }
  }
  return { ...state, stack }
}

export default Object.keys(funcs).reduce((prev, keyCode) => {
  prev[keyCode] = { stackLift: true, fn: compute(keyCode) }
  return prev
}, {})
