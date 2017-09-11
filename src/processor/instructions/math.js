import { evaluate, getKeyCodes } from '../math/evaluate'

export default getKeyCodes().reduce((prev, keyCode) => {
  prev[keyCode] = { entry: false, stackLift: true, fn: evaluate(keyCode) }
  return prev
}, {})
