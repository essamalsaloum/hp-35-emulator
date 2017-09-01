import { expect } from 'chai'

import * as C from '../opCodes'
import evaluate from './evaluate'

const EPS = 1e-11

const floatEqual = (x, y) => Math.abs(1 - (x / y)) < EPS

describe('evaluate', () => {

  describe('trigonometric functions', () => {

    it('should evaluate SIN to HP Prime value', () => {
      const state = {
        stack: [78, 0, 0, 0],
        buffer: '78',
        stackLift: false
      }
      const newState = evaluate(C.SIN)(state)
      const [x] = newState.stack
      const hpVal = 0.978147600734
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should evaluate COS to HP Prime value', () => {
      const state = {
        stack: [78, 0, 0, 0],
        buffer: '78',
        stackLift: false
      }
      const newState = evaluate(C.COS)(state)
      const [x] = newState.stack
      const hpVal = 0.207911690818
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should evaluate TAN to HP Prime value', () => {
      const state = {
        stack: [78, 0, 0, 0],
        buffer: '78',
        stackLift: false
      }
      const newState = evaluate(C.TAN)(state)
      const [x] = newState.stack
      const hpVal = 4.70463010948
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should evaluate ASIN to HP Prime value', () => {
      const state = {
        stack: [0.978147600734, 0, 0, 0],
        buffer: '0.978147600734',
        stackLift: false
      }
      const newState = evaluate(C.ASIN)(state)
      const [x] = newState.stack
      const hpVal = 78
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should evaluate ACOS to HP Prime value', () => {
      const state = {
        stack: [0.20791169081, 0, 0, 0],
        buffer: '0.20791169081',
        stackLift: false
      }
      const newState = evaluate(C.ACOS)(state)
      const [x] = newState.stack
      const hpVal = 78
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should evaluate ATAN to HP Prime value', () => {
      const state = {
        stack: [4.70463010948, 0, 0, 0],
        buffer: '4.70463010948',
        stackLift: false
      }
      const newState = evaluate(C.ATAN)(state)
      const [x] = newState.stack
      const hpVal = 78
      expect(floatEqual(x, hpVal)).to.be.true
    })

  })
})
