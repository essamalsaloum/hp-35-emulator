const STACK_SIZE = 4

export const newStack = () => {
  const stack = []
  stack.length = STACK_SIZE
  for (let i = 0; i < STACK_SIZE; i++) {
    stack[i] = 0
  }
  return stack
}

export default () => {
  return {
    stack: newStack(),
    buffer: '0',
    computed: false,
    inputMode: true
  }
}

