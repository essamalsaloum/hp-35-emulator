import arithmetic from './arithmetic'
import transcend from './transcend'

const instructions = Object.assign({},
  arithmetic,
  transcend
)

const unaryFn = ([x, ...rest], fn) =>
  [fn(x), ...rest]

const binaryFn = ([x, y, ...rest], fn) =>
  [fn(x, y), ...rest, ...rest.slice(-1)]

const evaluate = opCode => state => {
  const { stack } = state
  const instruction = instructions[opCode]
  if (!instruction) {
    console.error(`evaluate: not implemented [${opCode}]`)
    return state
  }

  const { arity = 0, fn } = instruction
  const newStack = arity === 2 ? binaryFn(stack, fn) : unaryFn(stack, fn)

  return {
    ...state,
    stack: newStack,
    buffer: newStack[0].toString()
  }
}

export default evaluate
