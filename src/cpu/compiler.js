import cpu from './index'
import * as github from '../services/github'
import { Tokenizer, TokenType } from './Tokenizer'

const CONTEXT_TRUNCATE_AT = 50

const isBlankOrComment = line => line === '' || /^\s*\/\//.test(line)

export async function compile(text, mode = 'text', aliasMap = {}) {
  // console.log('compile', mode, text)
  return mode === 'markdown'
    ? compileMarkDownProgram(text, aliasMap)
    : compilePlainTextProgram(text, aliasMap)
}

async function compileMarkDownProgram(text, aliasMap = {}) {
  if (!/^\s*```txt/gm.test(text)) {
    return Promise.reject(new Error('invalid file format'))
  }
  const progText = extractProgramText(text)
  return compilePlainTextProgram(progText, aliasMap)
}

async function compilePlainTextProgram(text, aliasMap = {}) {
  const keyCodes = []

  text = removeBlankAndCommentLines(text)
  const tokenizer = new Tokenizer(text)

  try {
    let node = await tokenizer.next()

    while (!node.done) {
      if (node.value.type === TokenType.token) {
        if (node.value.text === 'import') {
          node = await tokenizer.next()
          if (node.done) {
            throw createUnexpectedEndError()
          }
          if (node.value.type !== TokenType.quotedString) {
            throw createError(`expected quoted string}`, node.value.context)
          }
          const name = node.value.text.slice(1, -1)
          const programs = await github.fetchProgramList()
          const program = programs[name]
          if (!program) {
            throw createError(`program not found: ${name}`, node.value.context)
          }
          const { url, sha } = program
          const importedText = await github.fetchProgramText(url, sha)
          const mode = /^```txt/m.test(importedText) ? 'markdown' : text
          const importedKeyCodes = await compile(importedText, mode, aliasMap)
          keyCodes.push(importedKeyCodes)
          node = await tokenizer.next()
        } else if (node.value.text === 'alias') {
          node = await tokenizer.next()
          if (node.done) {
            throw createUnexpectedEndError()
          }
          if (node.value.type !== TokenType.token) {
            throw createError(`expected alias name`, node.value.context)
          }
          const aliasName = node.value.text
          node = await tokenizer.next()
          if (node.done) {
            throw createUnexpectedEndError()
          }
          if (node.value.type !== TokenType.equalSign) {
            throw createError(`expected '='`, node.value.context)
          }
          node = await tokenizer.next()
          if (node.done) {
            throw createUnexpectedEndError()
          }
          if (node.value.type !== TokenType.leftBrace) {
            throw createError(`expected '{'`, node.value.context)
          }
          node = await tokenizer.next()
          const aliasTokens = []
          while (!node.done && node.value.type !== TokenType.rightBrace) {
            if (node.value.type !== TokenType.token) {
              throw createError(`unexpected: '${node.value.text}'`, node.value.context)
            }
            aliasTokens.push(node.value.text)
            node = await tokenizer.next()
          }
          if (node.done) {
            throw createError(`missing '}'`, 'end of program')
          }
          aliasMap[aliasName] = aliasTokens
          node = await tokenizer.next()
        } else {
          const tokens = expandAlias(node.value.text, aliasMap)
          for (const token of tokens) {
            if (!cpu.isValidInstruction(token)) {
              throw createError(`syntax error: '${token}'`, node.value.context)
            }
            keyCodes.push(token)
          }
          node = await tokenizer.next()
        }
      } else {
        throw createError(`unexpected: '${node.value.text}'`, node.value.context)
      }
    }
    return keyCodes.filter(keyCode => keyCode.length !== 0)
  } catch (err) {
    return Promise.reject(err)
  }
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
  return new Error(`${message} near:\n${context}`)
}

function createUnexpectedEndError() {
  return new Error('unexpected end of program')
}
