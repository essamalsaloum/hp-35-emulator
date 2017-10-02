import { expect } from 'chai'
import processor from '../processor'
import C from '../processor/keyCodes'

describe('processor', () => {

  describe('arithmetic functions', () => {

    it('should add X and Y for add instruction', () => {
      const state = {
        stack: [1, 2, 3, 4]
      }
      const expectedStack = [3, 3, 4, 4]

      const newState = processor.execute(state, C.ADD)
      expect(newState.stack).to.deep.equal(expectedStack)
    })

  })
})
