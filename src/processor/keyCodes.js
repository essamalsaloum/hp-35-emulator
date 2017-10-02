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
}
