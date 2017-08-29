import arithmetic from './arithmetic'
import transcend from './transcend'

const operations = Object.assign({},
  arithmetic,
  transcend
)

const unaryFn = ([x, ...rest], fn) =>
  [fn(x), ...rest]

const binaryFn = ([x, y, ...rest], fn) =>
  [fn(x, y), ...rest, 0]

const compute = opCode => state => {
  const { stack } = state
  const operation = operations[opCode]
  if (!operation) {
    console.error(`compute: not implemented [${opCode}]`)
    return state
  }

  const { arity = 0, fn } = operation
  const newStack = arity === 2 ? binaryFn(stack, fn) : unaryFn(stack, fn)

  return {
    stack: newStack,
    buffer: newStack[0].toString(),
    computed: true,
    inputMode: false
  }
}

export default compute
