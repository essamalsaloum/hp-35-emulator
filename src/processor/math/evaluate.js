import arithmetic from './arithmetic'
import transcend from './transcend'

const funcs = {
  ...arithmetic,
  ...transcend
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

  const { arity = 0, fn } = func
  const newStack = arity === 2 ? dyadicFn(stack, fn) : monadicFn(stack, fn)

  return {
    ...state,
    stack: newStack,
    buffer: newStack[0].toString()
  }
}

export const getKeyCodes = () => Object.keys(funcs)
