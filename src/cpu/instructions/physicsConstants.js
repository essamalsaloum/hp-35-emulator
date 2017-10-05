import K from '../keyCodes'

export const physicsConstantDefs = {
  [K.SPEED_OF_LIGHT]: { symb: 'c', text: 'Speed of light in vacuum', value: '299792458', unit: 'm s<sup>-1</sup>' },
  [K.ACCELERATION_OF_GRAVITY]: { symb: 'g', text: 'Standard acceleration of gravity', value: '9.80665', unit: 'm s<sup>-2</sup>' },
  [K.GRAVITATIONAL_CONSTANT]: { symb: 'G', text: 'Newtonian constant of gravitation', value: '6.673e-11', unit: 'm<sup>3</sup> kg<sup>-1</sup> s<sup>-2</sup>' },
  [K.MOLAR_VOLUME_OF_IDEAL_GAS]: { symb: 'V<sub>m</sub>', text: 'Molar volume of ideal gas', value: '0.022413996', unit: 'm<sup>3</sup> mol<sup>-1</sup>' },
  [K.AVOGADRO_CONSTANT]: { symb: 'N<sub>A</sub>', text: 'Avogadro constant', value: '6.02214199e+23', unit: 'mol<sup>-1</sup>' },
  [K.RYDBERG_CONSTANT]: { symb: 'R<sub>∞</sub>', text: 'Rydberg constant', value: '10973731.5685', unit: 'm<sup>-1</sup>' },
  [K.ELEMENTARY_CHARGE]: { symb: 'e', text: 'Elementary charge', value: '1.602176462e-19', unit: 'K' },
  [K.ELECTRON_MASS]: { symb: 'm<sub>e</sub>', text: 'Electron mass', value: '9.10938188e-31', unit: 'kg' },
  [K.PROTON_MASS]: { symb: 'm<sub>p</sub>', text: 'Proton mass', value: '1.67262158e-27', unit: 'kg' },
  [K.NEUTRON_MASS]: { symb: 'm<sub>n</sub>', text: 'Neutron mass', value: '1.67492716e-27', unit: 'kg' },
  [K.MUON_MASS]: { symb: 'm<sub>μ</sub>', text: 'Muon mass', value: '1.88353109e-28', unit: 'kg' },
  [K.BOLTZMAN_CONSTANT]: { symb: 'k', text: 'Boltzmann constant', value: '1.3806503e-23', unit: 'J K<sup>-1</sup>' },
  [K.PLANCK_CONSTANT]: { symb: 'h', text: 'Planck constant', value: '6.62606876e-34', unit: 'J s' },
  [K.PLANCK_CONSTANT_OVER_2_PI]: { symb: '&#8463;', text: 'Planck constant over 2 pi', value: '1.054571596e-34', unit: 'J s' },
  [K.MAGNETIC_FLUX_QUANTUM]: { symb: 'Φ<sub>0</sub>', text: 'Magnetic flux quantum', value: '2.067833636e-15', unit: 'Wb' },
  [K.BOHR_RADIUS]: { symb: 'a<sub>0</sub>', text: 'Bohr radius', value: '5.291772083e-11', unit: 'm' },
  [K.ELECTRIC_CONSTANT]: { symb: 'ε<sub>0</sub>', text: 'Electric constant', value: '8.854187817e-12', unit: 'F m<sup>-1</sup>' },
  [K.MOLAR_GAS_CONSTANT]: { symb: '𝐑', text: 'Molar gas constant', value: '8.314472', unit: 'mol<sup>-1</sup> k<sup>-1</sup>' },
  [K.FARADAY_CONSTANT]: { symb: '𝐅', text: 'Faraday constant', value: '96485.3415', unit: 'K mol<sup>-1</sup>' },
  [K.ATOMIC_MASS_CONSTANT]: { symb: 'm<sub>u</sub>', text: 'Atomic mass constant', value: '1.66053873e-27', unit: 'kg' },
  [K.MAGNETIC_CONSTANT]: { symb: 'μ<sub>0</sub>', text: 'Magnetic constant', value: '1.2566370614e-6', unit: 'NA<sup>-2</sup>' },
  [K.BOHR_MAGNETON]: { symb: 'μ<sub>B</sub>', text: 'Bohr magneton', value: '9.27400899e-24', unit: 'J T<sup>-1</sup>' },
  [K.NUCLEAR_MAGNETON]: { symb: 'μ<sub>N</sub>', text: 'Nuclear magneton', value: '5.05078317e-27', unit: 'J T<sup>-1</sup>' },
  [K.PROTON_MAGNETIC_MOMENT]: { symb: 'μ<sub>P</sub>', text: 'Proton magnetic moment', value: '1.410606633e-26', unit: 'J T<sup>-1</sup>' },
  [K.ELECTRON_MAGNETIC_MOMENT]: { symb: 'μ<sub>e</sub>', text: 'Electron magnetic moment', value: '-9.28476362e-24', unit: 'J T<sup>-1</sup>' },
  [K.NEUTRON_MAGNETIC_MOMENT]: { symb: 'μ<sub>n</sub>', text: 'Neutron magnetic moment', value: '-9.662364e-27', unit: 'J T<sup>-1</sup>' },
  [K.MUON_MAGNETIC_MOMENT]: { symb: 'μ<sub>μ</sub>', text: 'Muon magnetic moment', value: '-4.49044813e-26', unit: 'J T<sup>-1</sup>' },
  [K.CLASSICAL_ELECTRON_RADIUS]: { symb: 'r<sup>e</sup>', text: 'Classical electron radius', value: '2.817940285e-15', unit: 'm' },
  [K.IMPEDANCE_OF_FREE_SPACE]: { symb: 'Z<sub>0</sub>', text: 'Impedance of free space', value: '376.730313461', unit: 'Ω' },
  [K.COMPTON_WAVELENGTH]: { symb: 'λ', text: 'Compton wavelength', value: '2.426310215e-12', unit: 'm' },
  [K.NEUTRON_COMPTON_WAVELENGTH]: { symb: 'λ<sub>n</sub>', text: 'Neutron Compton wavelength', value: '1.319590898e-15', unit: 'm' },
  [K.PROTON_COMPTON_WAVELENGTH]: { symb: 'λ<sub>p</sub>', text: 'Proton Compton wavelength', value: '1.321409847e-15', unit: 'm' },
  [K.FINE_STRUCTURE_CONSTANT]: { symb: 'α', text: 'Fine structure constant', value: '7.297352533e-3', unit: '' },
  [K.STEFAN_BOLTZMAN_CONSTANT]: { symb: 'σ', text: 'Stefan–Boltzmann constant', value: '5.6704e-8', unit: 'W m<sup>-2</sup> K<sup>-4</sup>' },
  [K.CELSIUS_TEMPERATURE]: { symb: 't', text: 'Celsius temperature', value: '273.15', unit: '' },
  [K.STANDARD_ATMOSPHERE]: { symb: 'a<sup>tm</sup>', text: 'Standard atmosphere', value: '101325', unit: 'Pa' },
  [K.PROTON_GYROMAGNETIC_RATIO]: { symb: 'γ<sup>P</sup>', text: 'Proton gyromagnetic ratio', value: '267522212', unit: 's<sup>-1</sup> T<sup>-1</sup>' },
  [K.FIRST_RADIATION_CONSTANT]: { symb: 'c<sub>1</sub>', text: 'First radiation constant', value: '3.74177107e-16', unit: 'W m<sup>2</sup>' },
  [K.SECOND_RADIATION_CONSTANT]: { symb: 'c<sub>2</sub>', text: 'Second radiation constant', value: '1.43877736e-2', unit: 'm K' },
  [K.CONDUCTANCE_QUANTUM]: { symb: 'G<sub>0</sub>', text: 'Conductance quantum', value: '7.748091696e-5', unit: 'S' },
  [K.NATURAL_LOGARITHM_BASE_NUMBER]: { symb: 'e', text: 'The base number of natural logarithm (natural constant)', value: '2.71828182846', unit: '' }
}

export default (() =>
  Object.keys(physicsConstantDefs).reduce((prev, key) => {
    prev[key] = ([x, y, z]) => [+physicsConstantDefs[key].value, x, y, z]
    return prev
  }, {})
)()
