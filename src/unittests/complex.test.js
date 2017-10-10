import math from 'mathjs'
import { expect } from 'chai'

describe('math complex', () => {
  it('produce an error for invalid complex input', () => {
    try {
      const result = math.complex('1234 abc')
    } catch (error) {
      console.log(error)
    }
  })
})
