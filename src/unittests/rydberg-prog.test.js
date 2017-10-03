import { expect } from 'chai'
import cpu from '../cpu'

const initialState = {
  stack: [ 0, 0, 0, 0 ],
  buffer: '0'
}

const rydbergProg = [
  '9.10938e-31',
  '1.60218e-19',
  '4',
  'pow',
  'mul',
  '8',
  '8.85419e-12',
  'sqr',
  'mul',
  '6.62608e-34',
  '3',
  'pow',
  'mul',
  '2.99792e+8',
  'mul',
  'div'
]

describe('cpu', () => {
  it('should run the Rydberg program', () => {
    const expectedRydbergConstant = 1.0973781e+7
    const finalState = rydbergProg.reduce(cpu.execute.bind(cpu), {...initialState})
    const [computedRydbergConstant] = finalState.stack
    expect(Math.abs(computedRydbergConstant - expectedRydbergConstant) < 1.0).to.be.true
  })
})