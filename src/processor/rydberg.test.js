import { expect } from 'chai'

import * as C from './keyCodes'
import execute from './controlUnit'
import initialState from '../store/init'

const m_e = [C.DIGIT_9, C.DECIMAL, C.DIGIT_1, C.DIGIT_0, C.DIGIT_9, C.DIGIT_3, C.DIGIT_8, C.EEX, C.DIGIT_3, C.DIGIT_1, C.CHS]
const e = [C.DIGIT_1, C.DECIMAL, C.DIGIT_6, C.DIGIT_0, C.DIGIT_2, C.DIGIT_1, C.DIGIT_8, C.EEX, C.DIGIT_1, C.DIGIT_9, C.CHS]
const eps_0 = [C.DIGIT_8, C.DECIMAL, C.DIGIT_8, C.DIGIT_5, C.DIGIT_4, C.DIGIT_1, C.DIGIT_9, C.EEX, C.DIGIT_1, C.DIGIT_2, C.CHS]
const h = [C.DIGIT_6, C.DECIMAL, C.DIGIT_6, C.DIGIT_2, C.DIGIT_6, C.DIGIT_0, C.DIGIT_8, C.EEX, C.DIGIT_3, C.DIGIT_4, C.CHS]
const c = [C.DIGIT_2, C.DECIMAL, C.DIGIT_9, C.DIGIT_9, C.DIGIT_7, C.DIGIT_9, C.DIGIT_2, C.EEX, C.DIGIT_8]

const keyStrokes = [
  ...m_e, C.ENTER,
  C.DIGIT_4, C.ENTER,
  ...e,
  C.POW,
  C.MUL,
  C.DIGIT_8, C.ENTER,
  C.DIGIT_2, C.ENTER,
  ...eps_0,
  C.POW,
  C.MUL,
  C.DIGIT_3,
  C.ENTER,
  ...h,
  C.POW,
  C.MUL,
  ...c,
  C.MUL,
  C.DIV
]

describe('processor', () => {
  it('should compute the Rydberg constant', () => {
    const expectedRydbergConstant = 1.0973781e+7
    const finalState = keyStrokes.reduce((state, keyStroke) => execute(keyStroke)(state), initialState())
    const [computedRydbergConstant] = finalState.stack
    expect(Math.abs(computedRydbergConstant - expectedRydbergConstant) < 1.0).to.be.true
  })
})
