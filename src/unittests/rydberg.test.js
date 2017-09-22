import { expect } from 'chai'
import processor from '../processor'
import C from '../processor/keyCodes'

const m_e = [C.D9, C.DOT, C.D1, C.D0, C.D9, C.D3, C.D8, C.EEX, C.D3, C.D1, C.CHS]
const e = [C.D1, C.DOT, C.D6, C.D0, C.D2, C.D1, C.D8, C.EEX, C.D1, C.D9, C.CHS]
const eps_0 = [C.D8, C.DOT, C.D8, C.D5, C.D4, C.D1, C.D9, C.EEX, C.D1, C.D2, C.CHS]
const h = [C.D6, C.DOT, C.D6, C.D2, C.D6, C.D0, C.D8, C.EEX, C.D3, C.D4, C.CHS]
const c = [C.D2, C.DOT, C.D9, C.D9, C.D7, C.D9, C.D2, C.EEX, C.D8]

const initialState = {
  stack: [ 0, 0, 0, 0 ],
  buffer: '0'
}

const keyCodes = [
  ...m_e, C.ENTER,
  ...e, C.ENTER,
  C.D4,
  C.POW,
  C.MUL,
  C.D8, C.ENTER,
  ...eps_0,
  C.SQR,
  C.MUL,
  ...h, C.ENTER,
  C.D3,
  C.POW,
  C.MUL,
  ...c,
  C.MUL,
  C.DIV
]

describe('processor', () => {
  it('should compute the Rydberg constant', () => {
    const expectedRydbergConstant = 1.0973781e+7
    const finalState = keyCodes.reduce(processor.execute.bind(processor), { ...initialState })
    const [computedRydbergConstant] = finalState.stack
    expect(Math.abs(computedRydbergConstant - expectedRydbergConstant) < 1.0).to.be.true
  })
})
