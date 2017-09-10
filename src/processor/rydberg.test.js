import { expect } from 'chai'

import * as A from './actionCodes'
import execute from './controlUnit'
import initialState from '../store/init'

const m_e = ['9', '.', '1', '0', '9', '3', '8', A.EEX, '3', '1', A.CHS]
const e = ['1', '.', '6', '0', '2', '1', '8', A.EEX, '1', '9', A.CHS]
const eps_0 = ['8', '.', '8', '5', '4', '1', '9', A.EEX, '1', '2', A.CHS]
const h = ['6', '.', '6', '2', '6', '0', '8', A.EEX, '3', '4', A.CHS]
const c = ['2', '.', '9', '9', '7', '9', '2', A.EEX, '8']

const actionCodes = [
  ...m_e, A.ENTER,
  '4', A.ENTER,
  ...e,
  A.POW,
  A.MUL,
  '8', A.ENTER,
  '2', A.ENTER,
  ...eps_0,
  A.POW,
  A.MUL,
  '3',
  A.ENTER,
  ...h,
  A.POW,
  A.MUL,
  ...c,
  A.MUL,
  A.DIV
]

describe('processor', () => {
  it('should compute the Rydberg constant', () => {
    const expectedRydbergConstant = 1.0973781e+7
    const finalState = actionCodes.reduce(execute, initialState())
    const [computedRydbergConstant] = finalState.stack
    expect(Math.abs(computedRydbergConstant - expectedRydbergConstant) < '1.0').to.be.true
  })
})
