import { expect } from 'chai'
import { Tokenizer, TokenType } from '../processor/Tokenizer'

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
      { type: TokenType.token, text: 'alias' },
      { type: TokenType.token, text: 'x^3', },
      { type: TokenType.equalSign, text: '=' },
      { type: TokenType.leftBrace, text: '{' },
      { type: TokenType.token, text: '3' },
      { type: TokenType.token, text: 'y^x' },
      { type: TokenType.rightBrace, text: '}' }
    ]
    expect(result).to.deep.equal(expectedResult)
  })

})
