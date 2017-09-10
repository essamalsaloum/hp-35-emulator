import { expect } from 'chai'

import * as A from '../actionCodes'
import { evaluate } from './evaluate'

describe('evaluate', () => {

  describe('arithmetic functions', () => {

    it('should add X and Y for opcode add', () => {
      const state = {
        stack: [1, 2, 3, 4],
        buffer: '1'
      }
      const expectedState = {
        stack: [3, 3, 4, 4],
        buffer: '3'
      }
      const newState = evaluate(A.ADD)(state)
      expect(newState).to.deep.equal(expectedState)
    })

  })
})
