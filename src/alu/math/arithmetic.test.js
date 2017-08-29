import { expect } from 'chai'

import * as C from '../opCodes'
import compute from './computer'

describe('compute', () => {

  describe('arithmetic functions', () => {

    it('should add X and Y for opcode add', () => {
      const state = {
        stack: [1, 2, 3, 4],
        buffer: '1',
        liftStack: true
      }
      const expectedState = {
        stack: [3, 3, 4, 4],
        buffer: '3',
        liftStack: true,
        inputMode: false
      }
      const newState = compute(C.ADD)(state)
      expect(newState).to.deep.equal(expectedState)
    })

  })
})
