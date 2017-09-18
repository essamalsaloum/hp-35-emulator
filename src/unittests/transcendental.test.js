import { expect } from 'chai'
import { C, execute } from '../unittests'

const EPS = 1e-11

const floatEqual = (x, y) => Math.abs(1 - (x / y)) < EPS

describe('processor', () => {

  describe('trigonometric functions', () => {

    it('should evaluate SIN to HP Prime value', () => {
      const state = {
        stack: [78, 0, 0, 0]
      }
      const newState = execute(state, C.SIN)
      const [x] = newState.stack
      const hpVal = 0.978147600734
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should evaluate COS to HP Prime value', () => {
      const state = {
        stack: [78, 0, 0, 0]
      }
      const newState = execute(state, C.COS)
      const [x] = newState.stack
      const hpVal = 0.207911690818
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should evaluate TAN to HP Prime value', () => {
      const state = {
        stack: [78, 0, 0, 0]
      }
      const newState = execute(state, C.TAN)
      const [x] = newState.stack
      const hpVal = 4.70463010948
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should evaluate ASIN to HP Prime value', () => {
      const state = {
        stack: [0.978147600734, 0, 0, 0]
      }
      const newState = execute(state, C.ASIN)
      const [x] = newState.stack
      const hpVal = 78
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should evaluate ACOS to HP Prime value', () => {
      const state = {
        stack: [0.20791169081, 0, 0, 0]
      }
      const newState = execute(state, C.ACOS)
      const [x] = newState.stack
      const hpVal = 78
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should evaluate ATAN to HP Prime value', () => {
      const state = {
        stack: [4.70463010948, 0, 0, 0]
      }
      const newState = execute(state, C.ATAN)
      const [x] = newState.stack
      const hpVal = 78
      expect(floatEqual(x, hpVal)).to.be.true
    })

  })
})
