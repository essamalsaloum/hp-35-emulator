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
  if (typeof x !== 'object') {
    stack[0] = Number.isFinite(x) ? x : new Error('Error')
  }
  return { ...state, stack }
}

export default Object.keys(funcs).reduce((prev, keyCode) => {
  prev[keyCode] = { stackLift: true, fn: compute(keyCode) }
  return prev
}, {})
