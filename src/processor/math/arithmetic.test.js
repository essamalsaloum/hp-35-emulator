import { expect } from 'chai'

import * as C from '../opCodes'
import evaluate from './evaluate'

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
      const newState = evaluate(C.ADD)(state)
      expect(newState).to.deep.equal(expectedState)
    })

  })
})
