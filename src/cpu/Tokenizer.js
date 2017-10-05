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

  next() {
    return new Promise((resolve, reject) => {
      if (this.text === '') {
        return resolve({ done: true })
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
          return resolve(result)
        }
      }

      reject(new Error('logic error in Tokenizer'))
    })
  }
}