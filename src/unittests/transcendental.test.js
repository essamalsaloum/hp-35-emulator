import { expect } from 'chai'
import cpu from '../cpu'
import K from '../cpu/keyCodes'

const EPS = 1e-11

const floatEqual = (x, y) => Math.abs(1 - (x / y)) < EPS

describe('cpu', () => {

  describe('trigonometric functions', () => {

    it('should evaluate SIN to HP Prime value', () => {
      const state = {
        stack: [78, 0, 0, 0]
      }
      const newState = cpu.execute(state, K.SIN)
      const [x] = newState.stack
      const hpVal = 0.978147600734
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should evaluate COS to HP Prime value', () => {
      const state = {
        stack: [78, 0, 0, 0]
      }
      const newState = cpu.execute(state, K.COS)
      const [x] = newState.stack
      const hpVal = 0.207911690818
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should evaluate TAN to HP Prime value', () => {
      const state = {
        stack: [78, 0, 0, 0]
      }
      const newState = cpu.execute(state, K.TAN)
      const [x] = newState.stack
      const hpVal = 4.70463010948
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should evaluate ASIN to HP Prime value', () => {
      const state = {
        stack: [0.978147600734, 0, 0, 0]
      }
      const newState = cpu.execute(state, K.ASIN)
      const [x] = newState.stack
      const hpVal = 78
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should evaluate ACOS to HP Prime value', () => {
      const state = {
        stack: [0.20791169081, 0, 0, 0]
      }
      const newState = cpu.execute(state, K.ACOS)
      const [x] = newState.stack
      const hpVal = 78
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should evaluate ATAN to HP Prime value', () => {
      const state = {
        stack: [4.70463010948, 0, 0, 0]
      }
      const newState = cpu.execute(state, K.ATAN)
      const [x] = newState.stack
      const hpVal = 78
      expect(floatEqual(x, hpVal)).to.be.true
    })

  })
})
