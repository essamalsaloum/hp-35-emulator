import arithmetic from './arithmetic'
import transcend from './transcend'

const funcs = Object.assign({},
  arithmetic,
  transcend
)

const monadicFn = ([x, ...rest], fn) =>
  [fn(x), ...rest]

const dyadicFn = ([x, y, ...rest], fn) =>
  [fn(x, y), ...rest, ...rest.slice(-1)]

const evaluate = keyCode => state => {
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

export default evaluate
