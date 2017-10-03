import arithmetic from './math/arithmetic'
import transcendental from './math/transcendental'
import probability from './math/probability'

const funcs = {
  ...arithmetic,
  ...transcendental,
  ...probability,
}

const compute = keyCode => state => {
  const fn = funcs[keyCode]
  if (!fn) {
    throw new Error(`math: not implemented [${keyCode}]`)
  }
  const { stack } = state
  return { ...state, stack: fn(stack) }
}

export default Object.keys(funcs).reduce((prev, keyCode) => {
  prev[keyCode] = { stackLift: true, fn: compute(keyCode) }
  return prev
}, {})
