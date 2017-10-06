export const TokenType = {
  leftBrace: 'leftBrace',
  rightBrace: 'rightBrace',
  equalSign: 'equalSign',
  quotedString: 'quotedString',
  token: 'token'
}

const tokenPatterns = [
  { regex: /^{/, type: TokenType.leftBrace },
  { regex: /^}/, type: TokenType.rightBrace },
  { regex: /^=/, type: TokenType.equalSign },
  { regex: /^'.+?'/, type: TokenType.quotedString },
  { regex: /^[^{}=\s]+/, type: TokenType.token },
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
        const result = {
          done: false,
          value: {
            type: pattern.type,
            text: match[0],
            context: this.text
          }
        }
        this.text = this.text.slice(match[0].length).trim()
        return result
      }
    }
    throw new Error('logic error in Tokenizer')
  }

  next() {
    return new Promise(resolve => resolve(this.nextSync()))
  }
}