import { expect } from 'chai'
import cpu from '../cpu'
import K from '../cpu/keyCodes'

const m_e = [K.D9, K.DOT, K.D1, K.D0, K.D9, K.D3, K.D8, K.EEX, K.D3, K.D1, K.CHS]
const e = [K.D1, K.DOT, K.D6, K.D0, K.D2, K.D1, K.D8, K.EEX, K.D1, K.D9, K.CHS]
const eps_0 = [K.D8, K.DOT, K.D8, K.D5, K.D4, K.D1, K.D9, K.EEX, K.D1, K.D2, K.CHS]
const h = [K.D6, K.DOT, K.D6, K.D2, K.D6, K.D0, K.D8, K.EEX, K.D3, K.D4, K.CHS]
const c = [K.D2, K.DOT, K.D9, K.D9, K.D7, K.D9, K.D2, K.EEX, K.D8]

const initialState = {
  stack: [ 0, 0, 0, 0 ],
  buffer: '0'
}

const keyCodes = [
  ...m_e, K.ENTER,
  ...e, K.ENTER,
  K.D4,
  K.POW,
  K.MUL,
  K.D8, K.ENTER,
  ...eps_0,
  K.SQR,
  K.MUL,
  ...h, K.ENTER,
  K.D3,
  K.POW,
  K.MUL,
  ...c,
  K.MUL,
  K.DIV
]

describe('cpu', () => {
  it('should compute the Rydberg constant', () => {
    const expectedRydbergConstant = 1.0973781e+7
    const finalState = keyCodes.reduce(cpu.execute.bind(cpu), { ...initialState })
    const [computedRydbergConstant] = finalState.stack
    expect(Math.abs(computedRydbergConstant - expectedRydbergConstant) < 1.0).to.be.true
  })
})
