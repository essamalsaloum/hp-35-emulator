import { expect } from 'chai'

import * as C from '../opCodes'
import execute from './executor'

describe('execute', () => {

  describe('stack functions', () => {

    it('should clear X on CLX', () => {
      const state = {
        stack: [1, 2, 3, 4],
        buffer: '1',
        computed: true
      }
      const expectState = {
        stack: [0, 2, 3, 4],
        buffer: '0',
        computed: false
      }
      const newState = execute(C.CLX)(state)
      expect(newState).to.deep.include(expectState)
    })

  })

  describe('arithmetic functions', () => {
    it('should add X and Y on ADD through the executor', () => {
      const state = {
        stack: [1, 2, 3, 4],
        buffer: '1',
        computed: true
      }
      const expectState = {
        stack: [3, 3, 4, 0],
        buffer: '3',
        computed: true
      }
      const newState = execute(C.ADD)(state)
      expect(newState).to.deep.include(expectState)
    })
  })

})
