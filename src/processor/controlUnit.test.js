import { expect } from 'chai'

import * as C from './keyCodes'
import execute from './controlUnit'

describe('execute', () => {

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
      const newState = execute(state, C.CLX)
      expect(newState).to.deep.include(expectState)
    })

  })

  describe('arithmetic functions', () => {
    it('should add X and Y on ADD through the control unit', () => {
      const state = {
        stack: [1, 2, 3, 4],
        buffer: '1',
        stackLift: true
      }
      const expectState = {
        stack: [3, 3, 4, 4],
        buffer: '3',
        stackLift: true
      }
      const newState = execute(state, C.ADD)
      expect(newState).to.deep.include(expectState)
    })
  })

})
