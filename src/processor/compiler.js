import aliases from './aliases'
import processor from './index'
import { Tokenizer, TokenType } from './Tokenizer'

const CONTEXT_TRUNCATE_AT = 50
const isBlankOrComment = line => line === '' || /^\s*\/\//.test(line)
export function compile(text, mode = 'text') {
  return mode === 'markdown'
    ? compileMarkDownProgram(text)
    : compilePlainTextProgram(text)
}

function compileMarkDownProgram(text) {
  if (!/^\s*```txt/gm.test(text)) {
    console.log('invalid file format')
    return
  }
  const progText = extractProgramText(text)
  return compilePlainTextProgram(progText)
}

export function extractProgramText(text) {
  const matches = text.match(/^```txt[\s\S]+?```/gm)
  return matches.reduce((buf, match) => {
    buf += match.slice(6, -3) + '\n'
    return buf
  }, '').trim()
}

const removeBlankAndCommentLines = text =>
  text
    .split(/\n/)
    .map(line => line.trim())
    .filter(line => !isBlankOrComment(line))
    .join('\n')

function compilePlainTextProgram(text) {
  const opcodes = []
  const aliasMap = Object.keys(aliases).reduce((prev, name) => {
    prev[name] = [aliases[name]]
    return prev
  }, {})

  text = removeBlankAndCommentLines(text)
  const tokenizer = new Tokenizer(text)

  let node = tokenizer.next()
  while (!node.done) {
    if (node.value.type === TokenType.token) {
      if (node.value.text === 'alias') {
        node = tokenizer.next()
        if (node.done) {
          return createUnexpectedEndError()
        }
        if (node.value.type !== TokenType.token) {
          return createError(`expected alias name`, node.value.context)
        }
        const aliasName = node.value.text
        node = tokenizer.next()
        if (node.done) {
          return createUnexpectedEndError()
        }
        if (node.value.type !== TokenType.equalSign) {
          return createError(`expected '='`, node.value.context)
        }
        node = tokenizer.next()
        if (node.done) {
          return createUnexpectedEndError()
        }
        if (node.value.type !== TokenType.leftBrace) {
          return createError(`expected '{'`, node.value.context)
        }
        node = tokenizer.next()
        const aliasTokens = []
        while (!node.done && node.value.type !== TokenType.rightBrace) {
          if (node.value.type !== TokenType.token) {
            return createError(`unexpected: '${node.value.text}'`, node.value.context)
          }
          aliasTokens.push(node.value.text)
          node = tokenizer.next()
        }
        if (node.done) {
          return createError(`missing '}'`, 'end of program')
        }
        aliasMap[aliasName] = aliasTokens
        node = tokenizer.next()
      } else {
        try {
          const tokens = expandAlias(node.value.text, aliasMap)
          for (const token of tokens) {
            if (!processor.isValidInstruction(token)) {
              return createError(`syntax error: '${token}'`, node.value.context)
            }
            opcodes.push(token)
          }
          node = tokenizer.next()
        } catch (error) {
          return { error }
        }
      }
    } else {
      return createError(`unexpected: '${node.value.text}'`, node.value.context)
    }
  }
  return { error: null, opcodes }
}

function expandAlias(token, aliasMap, tokens = []) {
  if (aliasMap.hasOwnProperty(token)) {
    if (aliasMap[token].indexOf(token) !== -1) {
      throw new Error('circular alias definition')
    }
    aliasMap[token].forEach(t => expandAlias(t, aliasMap, tokens))
  } else {
    tokens.push(token)
  }
  return tokens
}

function createError(message, context = 'end of program') {
  if (context.length > CONTEXT_TRUNCATE_AT) {
    if (/\s/.test(context[CONTEXT_TRUNCATE_AT])) {
      context = context.slice(0, 50)
    } else {
      context = context.slice(0, 50) + '...'
    }
  }
  return { error: new Error(`${message} near:\n${context}`) }
}

function createUnexpectedEndError() {
  return { error: new Error('unexpected end of program') }
}
