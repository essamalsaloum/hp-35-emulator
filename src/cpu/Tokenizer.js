export const TokenType = {
  block: 'block',
  equalSign: 'equalSign',
  quotedString: 'quotedString',
  token: 'token',
  eol: 'eol',
}

const tokenPatterns = [
  { regex: /^{(.*?)}/, type: TokenType.block },
  { regex: /^=/, type: TokenType.equalSign },
  { regex: /^'(.+?)'/, type: TokenType.quotedString },
  { regex: /^[^{}=\s]+/, type: TokenType.token },
  {regex: /^\n/, type: TokenType.eol}
]

export class Tokenizer {
  constructor(text) {
    this.text = text.trim()
  }

  nextSync() {
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

  next() {
    return Promise.resolve(this.nextSync())
  }

  nextToken() {
    return new Promise((resolve, reject) => {
      const node = this.nextSync()
      if (node.done) {
        reject(new Error('unexpected end of file'))
      } else {
        resolve(node)
      }
    })
  }
}