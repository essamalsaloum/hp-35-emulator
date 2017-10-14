import cpu from './index'
import K from './keyCodes'
import * as github from '../services/github'
import { Tokenizer, TokenType } from './Tokenizer'
// import aliases from './aliases'

const IMPORT = 'IMPORT'
const ALIAS = 'ALIAS'

const CONTEXT_TRUNCATE_AT = 50

export const keyCodeMap = (() => {
  return Object.keys(K).reduce((prev, key) => {
    const keyCode = K[key]
    prev[keyCode.toUpperCase()] = keyCode
    return prev
  }, {})
})()

const isBlankOrComment = line => line === '' || /^\s*\/\//.test(line)

const removeBlankAndCommentLines = text =>
  text
    .split(/\n/)
    .map(line => line.trim())
    .filter(line => !isBlankOrComment(line))
    .join('\n')
    .concat('\n')

function throwError(message, context = '') {
  if (context.length > CONTEXT_TRUNCATE_AT) {
    if (/\s/.test(context[CONTEXT_TRUNCATE_AT])) {
      context = context.slice(0, 50)
    } else {
      context = context.slice(0, 50) + '...'
    }
  }
  throw new Error(`${message}\nnear:\n${context}`)
}

async function assertEndOfLine(tokenizer) {
  const node = await tokenizer.nextToken()
  if (node.type !== TokenType.eol) {
    throwError(`expected end-of-line, not: '${node.text}'`, node.context)
  }
}

export default class Compiler {
  instructions = []
  aliasMap = {}
  currentLabel = null
  labelCounter = 0

  static extractProgramText(text) {
    const matches = text.match(/^```txt[\s\S]+?```/gm)
    return matches.reduce((buf, match) => {
      buf += match.slice(6, -3) + '\n'
      return buf
    }, '')
  }

  async compile(text, mode = 'text') {
    return mode === 'markdown'
      ? this.compileMarkDown(text)
      : this.compileText(text)
  }

  async compileMarkDown(text) {
    if (!/^\s*```txt/gm.test(text)) {
      throwError('invalid file format')
    }
    text = Compiler.extractProgramText(text)
    return this.compileText(text)
  }

  async compileText(text) {
    text = removeBlankAndCommentLines(text)
    const tokenizer = new Tokenizer(text)
    let node = await tokenizer.next()
    while (!node.done) {
      if (node.type === TokenType.token) {
        switch (node.upper) {
          case IMPORT:
            await this.parseImport(tokenizer)
            break
          case ALIAS:
            await this.parseAlias(tokenizer)
            break
          case K.STO:
          case K.STO_ADD:
          case K.STO_SUB:
          case K.STO_MUL:
          case K.STO_DIV:
          case K.RCL:
          case K.RCL_ADD:
          case K.RCL_SUB:
          case K.RCL_MUL:
          case K.RCL_DIV:
            await this.parseLabel(node, tokenizer)
            break
          case K.LBL:
            await this.parseLabel(node, tokenizer)
            break
          default:
            await this.parseOtherInstruction(node)
        }
      } else if (node.type !== TokenType.eol) {
        throwError(`unexpected token: '${node.text}'`, node.context)
      }
      node = await tokenizer.next()
    }
    return this.instructions.filter(instruction => instruction.length !== 0)
  }

  async parseImport(tokenizer) {
    const node = await tokenizer.nextToken()
    if (node.type !== TokenType.quotedString) {
      throwError(`expected quoted string`, node.context)
    }
    const importTarget = node.text
    let name = importTarget
    let path = ''
    const pos = importTarget.lastIndexOf('/')
    if (pos !== -1) {
      path = importTarget.slice(0, pos)
      name = importTarget.slice(pos + 1)
    }
    await assertEndOfLine(tokenizer)
    const programs = await github.fetchFileList(path)
    const program = programs[name]
    if (!program) {
      throwError(`program not found: ${importTarget}`)
    }
    const { url, sha } = program
    const text = await github.fetchProgramText(url, sha)
    const mode = /^```txt/m.test(text) ? 'markdown' : 'text'
    await this.compile(text, mode)
  }

  async parseAlias(tokenizer) {
    let node = await tokenizer.nextToken()
    if (node.type !== TokenType.token) {
      throwError(`expected alias name`, node.context)
    }
    const aliasName = node.text
    node = await tokenizer.nextToken()
    if (node.type !== TokenType.equalSign) {
      throwError(`expected '='`, node.context)
    }
    node = await tokenizer.nextToken()
    if (node.type !== TokenType.block) {
      throwError(`expected text block`, node.context)
    }
    await assertEndOfLine(tokenizer)
    const compiler = new Compiler()
    const instructions = await compiler.compile(node.text)
    this.aliasMap[aliasName] = instructions
  }

  async parseLabel(node, tokenizer) {
    const opCode = node.upper
    node = await tokenizer.nextToken()
    if (node.type !== TokenType.token ||
      node.upper.length !== 1 ||
      node.upper < 'A' || node.upper > 'Z') {
      throwError('memory identifier A-Z expected', node.context)
    }
    const operand = node.upper
    this.labelCounter = 0
    this.currentLabel = operand
    this.addInstruction({ opCode, operand })
    await assertEndOfLine(tokenizer)
  }

  async parseOtherInstruction(node) {
    const instructions = this.aliasMap[node.text]
    if (instructions) {
      for (const instruction of instructions) {
        this.addInstruction(instruction)
      }
    } else {
      const opCode = node.text
      if (!cpu.isValidInstruction(opCode)) {
        throwError(`syntax error: '${opCode}'`, node.context)
      }
      this.addInstruction({ opCode })
    }
  }

  addInstruction(instruction) {
    this.labelCounter += 1
    if (this.labelCounter > 999) {
      throwError('program too large')
    }
    let label = this.labelCounter.toString().padStart(4, '0')
    if (this.currentLabel) {
      label = this.currentLabel + label.slice(1)
    }
    this.instructions.push({ ...instruction, label })
  }
}
