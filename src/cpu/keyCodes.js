const physicsConstants = {
  SPEED_OF_LIGHT: 'speed_of_light',
  ACCELERATION_OF_GRAVITY: 'acceleration_of_gravity',
  GRAVITATIONAL_CONSTANT: 'gravitational_constant',
  MOLAR_VOLUME_OF_IDEAL_GAS: 'molar_volume_of_ideal_gas',
  AVOGADRO_CONSTANT: 'avogadro_constant',
  RYDBERG_CONSTANT: 'rydberg_constant',
  ELEMENTARY_CHARGE: 'elementary_charge',
  ELECTRON_MASS: 'electron_mass',
  PROTON_MASS: 'proton_mass',
  NEUTRON_MASS: 'neutron_mass',
  MUON_MASS: 'muon_mass',
  BOLTZMAN_CONSTANT: 'boltzman_constant',
  PLANCK_CONSTANT: 'planck_constant',
  PLANCK_CONSTANT_OVER_2_PI: 'Planck_constant_over_2_pi',
  MAGNETIC_FLUX_QUANTUM: 'magnetic_flux_quantum',
  BOHR_RADIUS: 'bohr_radius',
  ELECTRIC_CONSTANT: 'electric_constant',
  MOLAR_GAS_CONSTANT: 'molar_gas_constant',
  FARADAY_CONSTANT: 'faraday_constant',
  ATOMIC_MASS_CONSTANT: 'atomic_mass_constant',
  MAGNETIC_CONSTANT: 'magnetic_constant',
  BOHR_MAGNETON: 'bohr_magneton',
  NUCLEAR_MAGNETON: 'nuclear_magneton',
  PROTON_MAGNETIC_MOMENT: 'proton_magnetic_moment',
  ELECTRON_MAGNETIC_MOMENT: 'electron_magnetic_moment',
  NEUTRON_MAGNETIC_MOMENT: 'neutron_magnetic_moment',
  MUON_MAGNETIC_MOMENT: 'muon_magnetic_moment',
  CLASSICAL_ELECTRON_RADIUS: 'classical_electron_radius',
  IMPEDANCE_OF_FREE_SPACE: 'impedance_of_free_space',
  COMPTON_WAVELENGTH: 'compton_wavelength',
  NEUTRON_COMPTON_WAVELENGTH: 'neutron_compton_wavelength',
  PROTON_COMPTON_WAVELENGTH: 'proton_compton_wavelength',
  FINE_STRUCTURE_CONSTANT: 'fine_structure_constant',
  STEFAN_BOLTZMAN_CONSTANT: 'stefan_boltzman_constant',
  CELSIUS_TEMPERATURE: 'celsius_temperature',
  STANDARD_ATMOSPHERE: 'standard_atmosphere',
  PROTON_GYROMAGNETIC_RATIO: 'proton_gyromagnetic_ratio',
  FIRST_RADIATION_CONSTANT: 'first_radiation_constant',
  SECOND_RADIATION_CONSTANT: 'second_radiation_constant',
  CONDUCTANCE_QUANTUM: 'conductance_quantum',
  NATURAL_LOGARITHM_BASE_NUMBER: 'natural_logarithm_base_number'
}

const conversions = {
  // distance
  IN2CM: 'in2cm',       // Convert inches to cm
  CM2IN: 'cm2in',       // Converts inches to cm
  FT2M: 'ft2m',
  M2FT: 'm2ft',
  MI2KM: 'mi2km',       // Converts miles to km
  KM2MI: 'km2mi',       // Converts kilometers to miles
  YD2M: 'yd2m',
  M2YD: 'm2yd',

  // weight
  LB2KG: 'lb2kg',       // Converts pounds to kg
  KG2LB: 'kg2lb',       // Converts kilograms to pounds
  OZ2G: 'oz2g',
  G2OZ: 'g2oz',
  C2F: 'c2f',           // Convert degree C -> F
  F2C: 'f2c',           // Convert degree F -> C
  GAL2L: 'gal2l',       // Converts gallons to liters
  L2GAL: 'l2gal',       // Convert liters to gallons
  DEG2RAD: 'deg2rad',   // Degrees to radians. Returns (2π/360) x
  RAD2DEG: 'rad2deg',   // Degrees to radians. Returns (2π/360) x
  HMS2FRAC: 'hms2frac', // Convert hh:mm:ss to decimal fraction
  FRAC2HMS: 'frac2hms', // Converts x from a decimal fraction to hh:mm:ss format
}

const memory = {
  MEM: 'mem',
  STO_A: 'sto.a',
  STO_B: 'sto.b',
  STO_C: 'sto.c',
  STO_D: 'sto.d',
  STO_E: 'sto.e',
  STO_F: 'sto.f',
  STO_G: 'sto.g',
  STO_H: 'sto.h',
  STO_I: 'sto.i',
  STO_J: 'sto.j',
  STO_K: 'sto.k',
  STO_L: 'sto.l',
  STO_M: 'sto.m',
  STO_N: 'sto.n',
  STO_O: 'sto.o',
  STO_P: 'sto.p',
  STO_Q: 'sto.q',
  STO_R: 'sto.r',
  STO_S: 'sto.s',
  STO_T: 'sto.t',
  STO_U: 'sto.u',
  STO_V: 'sto.v',
  STO_W: 'sto.w',
  STO_X: 'sto.x',
  STO_Y: 'sto.y',
  STO_Z: 'sto.z',
  RCL_A: 'rcl.a',
  RCL_B: 'rcl.b',
  RCL_C: 'rcl.c',
  RCL_D: 'rcl.d',
  RCL_E: 'rcl.e',
  RCL_F: 'rcl.f',
  RCL_G: 'rcl.g',
  RCL_H: 'rcl.h',
  RCL_I: 'rcl.i',
  RCL_J: 'rcl.j',
  RCL_K: 'rcl.k',
  RCL_L: 'rcl.l',
  RCL_M: 'rcl.m',
  RCL_N: 'rcl.n',
  RCL_O: 'rcl.o',
  RCL_P: 'rcl.p',
  RCL_Q: 'rcl.q',
  RCL_R: 'rcl.r',
  RCL_S: 'rcl.s',
  RCL_T: 'rcl.t',
  RCL_U: 'rcl.u',
  RCL_V: 'rcl.v',
  RCL_W: 'rcl.w',
  RCL_X: 'rcl.x',
  RCL_Y: 'rcl.y',
  RCL_Z: 'rcl.z',
}

const input = {
  CANCEL: 'cancel',
  CHS: 'chs',
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
  DEL: 'del',
  DOT: 'dot',
  EEX: 'eex',
  PI: 'pi',
}

const stack = {
  CLR: 'clr',
  ENTER: 'enter',
  LAST_X: 'lastx',
  ROLL_DOWN: 'rolldown',
  SWAP: 'swap',
}

const math = {
  ACOS: 'acos',
  ACOSH: 'acosh',
  ALOG: 'alog',
  ASIN: 'asin',
  ASINH: 'asinh',
  ADD: 'add',
  ATAN: 'atan',
  ATANH: 'atanh',
  COS: 'cos',
  COSH: 'cosh',
  DIV: 'div',
  EXP: 'exp',
  EXPM: 'expm',
  FACT: 'fact',
  FP: 'fp',             // Fractional part of x
  IDIV: 'idiv',         // Integer division
  IP: 'ip',             // Integer part of x
  INTG: 'intg',         // Obtains the greatest integer equal to or less than given number
  INV: 'inv',           // Reciprocal of x
  LN: 'ln',
  LNP1: 'lnp1',
  LOG: 'log',
  MUL: 'mul',
  NCR: 'ncr',           // Combinations of n items taken r at a time = n!/(r!(n-r)!)
  NPR: 'npr',           // Permutations of n items taken r at a time. Returns n!/(n – r)!
  PCT: 'pct',             // (y × x) / 100
  PCTCHG: 'pctchg',       // (x - y) (100 / y)
  POW: 'pow',
  SIN: 'sin',
  SINH: 'sinh',         // Hyperbolic sine
  SQ: 'sq',
  SQRT: 'sqrt',
  SUB: 'sub',
  TAN: 'tan',
  TANH: 'tanh',         // Hyperbolic tangent
  XROOT: 'xroot',       // x-th root of y
}

export default {
  CONST: 'const',
  CONV: 'conv',
  RESET: 'reset',

  SHIFT_UP: 'shiftup',        // Activates up-shifted key functions
  SHIFT_DOWN: 'shiftdown',    // Activates down-shifted key functions
  HYPER: 'hyper',
  NOOP: 'noop',

  // New math functions. See page G2 ff. of the HP 35 Users Guide
  ABS: 'abs',           // Absolute value
  HMS2FRAC: 'hms2frac',    // Converts x from hours–minutes– seconds format to a decimal fraction

  // extensions

  HELP: 'help',

  ...input,
  ...stack,
  ...memory,
  ...math,
  ...physicsConstants,
  ...conversions,
}
