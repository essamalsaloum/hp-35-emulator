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

function assertEndOfLine(tokenizer) {
  const node = tokenizer.nextToken()
  if (node.type !== TokenType.eol) {
    throwError(`expected end-of-line, not: '${node.text}'`, node.context)
  }
}

export default class Compiler {
  instructions = []
  aliasMap = {}
  label = null

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
    let node = tokenizer.next()
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
          case K.DSLE:
          case K.ISGT:
            this.parseMemoryInstruction(node, tokenizer)
            break
          case K.GOTO:
            this.parseBranchInstruction(node, tokenizer)
            break
          default:
            this.parseOtherInstruction(node)
        }
      } else if (node.type === TokenType.label) {
        this.label = node.text
      } else if (node.type !== TokenType.eol) {
        throwError(`unexpected token: '${node.text}'`, node.context)
      }
      node = tokenizer.next()
    }
    this.instructions = this.instructions.filter(instr => instr.length !== 0)
    this.fixUpBranchDestinations()
    return this.instructions
  }

  async parseImport(tokenizer) {
    const node = tokenizer.nextToken()
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
    assertEndOfLine(tokenizer)
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
    let node = tokenizer.nextToken()
    if (node.type !== TokenType.token) {
      throwError(`expected alias name`, node.context)
    }
    const aliasName = node.text
    node = tokenizer.nextToken()
    if (node.type !== TokenType.equalSign) {
      throwError(`expected '='`, node.context)
    }
    node = tokenizer.nextToken()
    if (node.type !== TokenType.block) {
      throwError(`expected text block`, node.context)
    }
    assertEndOfLine(tokenizer)
    const compiler = new Compiler()
    const instructions = await compiler.compile(node.text)
    this.aliasMap[aliasName] = instructions
  }

  parseMemoryInstruction(node, tokenizer) {
    const opCode = node.upper
    node = tokenizer.nextToken()
    if (node.type !== TokenType.token ||
      node.upper.length !== 1 ||
      node.upper < 'A' || node.upper > 'Z') {
      throwError('memory identifier A-Z expected', node.context)
    }
    const operand = node.upper
    this.addInstruction({ opCode, operand })
    assertEndOfLine(tokenizer)
  }

  parseBranchInstruction(node, tokenizer) {
    const opCode = node.upper
    node = tokenizer.nextToken()
    if (node.type !== TokenType.token || !/^\w+$/.test(node.text)) {
      throwError('branch destination label expected', node.context)
    }
    const operand = node.text
    this.addInstruction({ opCode, operand })
    assertEndOfLine(tokenizer)
  }

  parseOtherInstruction(node) {
    const instructions = this.aliasMap[node.text]
    if (instructions) {
      for (const instruction of instructions) {
        this.addInstruction(instruction)
      }
    } else {
      const opCode = keyCodeMap[node.upper] || node.upper
      if (!cpu.isValidInstruction(opCode)) {
        throwError(`syntax error: '${node.text}'`, node.context)
      }
      this.addInstruction({ opCode })
    }
  }

  addInstruction(instruction) {
    this.instructions.push(this.label ? {...instruction, label: this.label} : instruction)
    this.label = null
  }

  fixUpBranchDestinations() {
    const gotos = this.instructions.filter(instr => instr.opCode === K.GOTO)
    gotos.forEach(goto => {
      const label = goto.operand
      const index = this.instructions.findIndex(instr => instr.label === label)
      if (index === -1) {
        throw new Error(`GOTO ${label}: label is undefined`)
      }
      goto.ip = index
    })
  }
}
