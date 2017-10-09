import { expect } from 'chai'
import cpu from '../cpu'
import K from '../cpu/keyCodes'

describe('cpu', () => {

  describe('stack functions', () => {

    it('should clear X on DEL', () => {
      const state = {
        stack: [1, 2, 3, 4],
        buffer: '1',
        stackLift: true
      }
      const expectState = {
        stack: [0, 2, 3, 4],
        buffer: '0',
        stackLift: false
      }
      const newState = cpu.execute(state, K.DEL)
      expect(newState).to.deep.include(expectState)
    })

  })

})
