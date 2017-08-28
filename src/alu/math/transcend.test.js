import { expect } from 'chai'
import compute from './computer'

const EPS = 1e-11

const floatEqual = (x, y) => Math.abs(1 - (x / y)) < EPS

describe('compute', () => {

  describe('trigonometric functions', () => {

    it('should compute SIN to HP Prime value', () => {
      const state = {
        stack: [78, 0, 0, 0],
        buffer: '78',
        computed: false
      }
      const newState = compute('sin')(state)
      const [x] = newState.stack
      const hpVal = 0.978147600734
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should compute COS to HP Prime value', () => {
      const state = {
        stack: [78, 0, 0, 0],
        buffer: '78',
        computed: false
      }
      const newState = compute('cos')(state)
      const [x] = newState.stack
      const hpVal = 0.207911690818
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should compute TAN to HP Prime value', () => {
      const state = {
        stack: [78, 0, 0, 0],
        buffer: '78',
        computed: false
      }
      const newState = compute('tan')(state)
      const [x] = newState.stack
      const hpVal = 4.70463010948
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should compute ASIN to HP Prime value', () => {
      const state = {
        stack: [0.978147600734, 0, 0, 0],
        buffer: '0.978147600734',
        computed: false
      }
      const newState = compute('asin')(state)
      const [x] = newState.stack
      const hpVal = 78
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should compute ACOS to HP Prime value', () => {
      const state = {
        stack: [0.20791169081, 0, 0, 0],
        buffer: '0.20791169081',
        computed: false
      }
      const newState = compute('acos')(state)
      const [x] = newState.stack
      const hpVal = 78
      expect(floatEqual(x, hpVal)).to.be.true
    })

    it('should compute ATAN to HP Prime value', () => {
      const state = {
        stack: [4.70463010948, 0, 0, 0],
        buffer: '4.70463010948',
        computed: false
      }
      const newState = compute('atan')(state)
      const [x] = newState.stack
      const hpVal = 78
      expect(floatEqual(x, hpVal)).to.be.true
    })

  })
})
