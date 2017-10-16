export const TokenType = {
  block: 'block',
  equalSign: 'equalSign',
  quotedString: 'quotedString',
  label: 'label',
  token: 'token',
  eol: 'eol',
}

const tokenPatterns = [
  { regex: /^\w[!=><>]+\w/, type: TokenType.token },
  { regex: /^(\w+):/, type: TokenType.label },
  { regex: /^'(.+?)'/, type: TokenType.quotedString },
  { regex: /^{(.*?)}/, type: TokenType.block },
  { regex: /^=/, type: TokenType.equalSign },
  { regex: /^[^{}=\s]+/, type: TokenType.token },
  { regex: /^\n/, type: TokenType.eol }
]

export class Tokenizer {
  constructor(text) {
    this.text = text
  }

  next() {
    if (this.text === '') {
      return { done: true }
    }
    for (const pattern of tokenPatterns) {
      const match = this.text.match(pattern.regex)
      if (match) {
        const text = match[1] || match[0]
        const result = {
          done: false,
          type: pattern.type,
          text,
          upper: text.toUpperCase(),
          context: this.text
        }
        this.text = this.text.slice(match[0].length).replace(/^[ \t]+/, '')
        return result
      }
    }
    throw new Error('logic error in Tokenizer')
  }

  nextToken() {
    const node = this.next()
    if (node.done) {
      throw new Error('unexpected end of file')
    }
    return node
  }
}