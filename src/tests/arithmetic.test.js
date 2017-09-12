import { expect } from 'chai'
import { C, execute, initialState } from './index'

describe('execute', () => {

  describe('arithmetic functions', () => {

    it('should add X and Y for opcode add', () => {
      const state = {
        stack: [1, 2, 3, 4]
      }
      const expectedStack = [3, 3, 4, 4]

      const newState = execute(state, C.ADD)
      expect(newState.stack).to.deep.equal(expectedStack)
    })

  })
})
