import compute from '../math/computer'

const opCodes = [
  'add',
  'sub',
  'mul',
  'div',
  'chs',
  'reciproc',
  'pow',
  'log',
  'ln',
  'exp',
  'sqrt',
  'sin',
  'cos',
  'tan',
  'asin',
  'acos',
  'atan'
]

export default (() => {
  const operations = {}
  opCodes.forEach(opCode => operations[opCode] = compute(opCode))
  return operations
})()
