export default {
  ACOS: 'acos',
  ADD: '+',
  ASIN: 'asin',
  ATAN: 'atan',
  CHS: 'chs',
  CLR: 'clr',
  CLX: 'clx',
  CONST: 'const',
  COS: 'cos',
  DOT: 'dot',
  D0: 'd0',
  D1: 'd1',
  D2: 'd2',
  D3: 'd3',
  D4: 'd4',
  D5: 'd5',
  D6: 'd6',
  D7: 'd7',
  D8: 'd8',
  D9: 'd9',
  DIV: '/',
  EEX: 'eex',
  ENTER: 'enter',
  EXP: 'e^x',
  LN: 'ln',
  LOG: 'log',
  MUL: '*',
  PI: 'pi',
  POW: 'y^x',
  RCL: 'rcl',
  ROLL_DOWN: 'rollDown',
  SIN: 'sin',
  SQRT: 'sqrt',
  STO: 'sto',
  SUB: '-',
  SWAP: '<>',
  TAN: 'tan',

  // deprecated:
  ARC: 'arc',                 // Replaced by SHIFT_UP and SHIFT_DOWN
  RECIPROCAL: 'reciprocal',   // Replaced by INV
  SQR: 'x^2',                 // Replaced by SQ

  SHIFT_UP: 'shiftUp',        // Activates up-shifted key functions
  SHIFT_DOWN: 'shiftDown',    // Activates down-shifted key functions

  // New math functions. See page G2 ff. of the HP 35 Users Guide
  ABS: 'abs',           // Absolute value
  ACOSH: 'acosh',       // Hyperbolic arc cosine
  ALOG: 'alog',         // 10^x (also known as antilog)
  ASINH: 'asinh',       // Hyperbolic arc sine
  ATANH: 'atanh',       // Hyperbolic arc tangent
  COSH: 'cosh',         // Hyperbolic cosine
  FACT: '!',            // Factorial
  FP: 'fp',             // Fractional part of x
  FROM_HMS: 'hms->',    // Converts x from hours–minutes– seconds format to a decimal fraction
  IDIV: 'idiv',         // Integer division
  INTG: 'intg',         // Obtains the greatest integer equal to or less than given number
  INV: '1/x',           // Reciprocal of x
  IP: 'ip',             // Integer part of x
  NCR: 'nCr',           // Combinations of n items taken r at a time = n!/(r!(n-r)!)
  NPR: 'nPr',           // Permutations of n items taken r at a time. Returns n!/(n – r)!
  PCT: '%',             // (y × x) / 100
  PCTCHG: '%chg',       // (x - y) (100 / y)
  SINH: 'sinh',         // Hyperbolic sine
  SQ: 'x^2',            // x^2
  TANH: 'tanh',         // Hyperbolic tangent
  TO_CM: '->cm',        // Convert inches to cm
  TO_DEG: '->deg',      // Convert radians to degrees
  TO_DEGREE_C: '->C',   // Convert degree F -> C
  TO_DEGREE_F: '->F',   // Convert degree C -> F
  TO_GAL: '->gal',      // Convert liters to gallons
  TO_HMS: '->hms',      // Converts x from a decimal fraction to hours–minutes–seconds format
  TO_KG: '->kg',        // Converts miles to kilometers
  TO_L: '->l',          // Converts gallons to liters
  TO_LB: '->lb',        // Converts kilograms to pounds
  TO_MILE: '->mile',    // Converts kilometers to miles
  TO_RAD: '->rad',      // Degrees to radians. Returns (2π/360) x
  XROOT: 'xRoot',       // x-th root of y

  // extensions

  CANCEL: 'cancel',
  HELP: 'help',

  STO_A: 'sto[a]',
  STO_B: 'sto[b]',
  STO_C: 'sto[c]',
  STO_D: 'sto[d]',
  STO_E: 'sto[e]',
  STO_F: 'sto[f]',
  STO_G: 'sto[g]',
  STO_H: 'sto[h]',
  STO_I: 'sto[i]',
  STO_J: 'sto[j]',
  STO_K: 'sto[k]',
  STO_L: 'sto[l]',
  STO_M: 'sto[m]',
  STO_N: 'sto[n]',
  STO_O: 'sto[o]',
  STO_P: 'sto[p]',
  STO_Q: 'sto[q]',
  STO_R: 'sto[r]',
  STO_S: 'sto[s]',
  STO_T: 'sto[t]',
  STO_U: 'sto[u]',
  STO_V: 'sto[v]',
  STO_W: 'sto[w]',
  STO_X: 'sto[x]',
  STO_Y: 'sto[y]',
  STO_Z: 'sto[z]',

  RCL_A: 'rcl[a]',
  RCL_B: 'rcl[b]',
  RCL_C: 'rcl[c]',
  RCL_D: 'rcl[d]',
  RCL_E: 'rcl[e]',
  RCL_F: 'rcl[f]',
  RCL_G: 'rcl[g]',
  RCL_H: 'rcl[h]',
  RCL_I: 'rcl[i]',
  RCL_J: 'rcl[j]',
  RCL_K: 'rcl[k]',
  RCL_L: 'rcl[l]',
  RCL_M: 'rcl[m]',
  RCL_N: 'rcl[n]',
  RCL_O: 'rcl[o]',
  RCL_P: 'rcl[p]',
  RCL_Q: 'rcl[q]',
  RCL_R: 'rcl[r]',
  RCL_S: 'rcl[s]',
  RCL_T: 'rcl[t]',
  RCL_U: 'rcl[u]',
  RCL_V: 'rcl[v]',
  RCL_W: 'rcl[w]',
  RCL_X: 'rcl[x]',
  RCL_Y: 'rcl[y]',
  RCL_Z: 'rcl[z]',
}
