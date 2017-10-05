import { expect } from 'chai'
import { Tokenizer, TokenType } from '../cpu/Tokenizer'

describe('Tokenizer', () => {

  it('should correctly tokenize', () => {
    const text = `
    alias x^3 = { 3 y^x }
    `
    const tokenizer = new Tokenizer(text)

    const result = []

    let item = tokenizer.next()
    while (!item.done) {
      result.push(item.value)
      item = tokenizer.next()
    }

    const expectedResult = [
      { type: 'token', text: 'alias', context: 'alias x^3 = { 3 y^x }' },
      { type: 'token', text: 'x^3', context: 'x^3 = { 3 y^x }' },
      { type: 'equalSign', text: '=', context: '= { 3 y^x }' },
      { type: 'leftBrace', text: '{', context: '{ 3 y^x }' },
      { type: 'token', text: '3', context: '3 y^x }' },
      { type: 'token', text: 'y^x', context: 'y^x }' },
      { type: 'rightBrace', text: '}', context: '}' }
    ]

    expect(result).to.deep.equal(expectedResult)
  })

})
