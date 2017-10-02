import { expect } from 'chai'
import processor from '../processor'
import C from '../processor/opcodes'

describe('processor', () => {

  describe('stack functions', () => {

    it('should clear X on CLX', () => {
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
      const newState = processor.execute(state, C.CLX)
      expect(newState).to.deep.include(expectState)
    })

  })

})
