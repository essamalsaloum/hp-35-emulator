import { expect } from 'chai'
import cpu from '../cpu'
import K from '../cpu/keyCodes'

describe('cpu', () => {

  describe('arithmetic functions', () => {

    it('should add X and Y for add keyCode', () => {
      const state = {
        stack: [1, 2, 3, 4]
      }
      const expectedStack = [3, 3, 4, 4]

      const newState = cpu.execute(state, K.ADD)
      expect(newState.stack).to.deep.equal(expectedStack)
    })

  })
})
