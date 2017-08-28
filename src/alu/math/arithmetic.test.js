import { expect } from 'chai'
import compute from './computer'

describe('compute', () => {

  describe('arithmetic functions', () => {

    it('should add X and Y for opcode add', () => {
      const state = {
        stack: [1, 2, 3, 4],
        buffer: '1',
        computed: true
      }
      const expectedState = {
        stack: [3, 3, 4, 0],
        buffer: '3',
        computed: true
      }
      const newState = compute('add')(state)
      expect(newState).to.deep.equal(expectedState)
    })

  })
})
