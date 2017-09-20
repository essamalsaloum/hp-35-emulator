import { expect } from 'chai'
import { execute, initialState } from '../unittests'

const rydbergProg = [
  '9.10938e-31',
  '1.60218e-19',
  '4',
  'pow',
  'mul',
  '8',
  '8.85419e-12',
  'square',
  'mul',
  '6.62608e-34',
  '3',
  'pow',
  'mul',
  '2.99792e+8',
  'mul',
  'div'
]

describe('processor', () => {
  it('should run the Rydberg program', () => {
    const expectedRydbergConstant = 1.0973781e+7
    const finalState = rydbergProg.reduce(execute, {...initialState})
    const [computedRydbergConstant] = finalState.stack
    expect(Math.abs(computedRydbergConstant - expectedRydbergConstant) < 1.0).to.be.true
  })
})