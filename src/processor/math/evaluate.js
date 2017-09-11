import arithmetic from './arithmetic'
import transcendental from './transcendental'

const funcs = {
  ...arithmetic,
  ...transcendental
}

const monadicFn = ([x, y, z, t], fn) => [fn(x), y, z, t]

const dyadicFn = ([x, y, z, t], fn) => [fn(x, y), z, t, t]

export const evaluate = keyCode => state => {
  const { stack } = state
  const func = funcs[keyCode]
  if (!func) {
    console.error(`evaluate: not implemented [${keyCode}]`)
    return state
  }

  const newStack = func.length === 2 ? dyadicFn(stack, func) : monadicFn(stack, func)

  return {
    ...state,
    stack: newStack,
    buffer: newStack[0].toString()
  }
}

export const getKeyCodes = () => Object.keys(funcs)
