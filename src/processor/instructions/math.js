import { evaluate, getKeyCodes } from '../math/evaluate'

export default getKeyCodes().reduce((prev, actionCode) => {
  prev[actionCode] = { entry: false, stackLift: true, fn: evaluate(actionCode) }
  return prev
}, {})
