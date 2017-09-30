import aliases from './aliases'
import processor from './index'

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

function compilePlainTextProgram(text) {
  const instanceAliases = {}

  const lines = text
    .toLowerCase()
    .split(/\n/)
    .map(line => line.trim())
    .filter(line => line !== '' && !line.startsWith('^'))

  return lines.reduce((prev, line) => {
    let error = null
    if (!line.startsWith('//')) {
      error = compileLine(line, instanceAliases, prev.keyCodes)
    }
    if (error && !prev.error) {
      prev.error = error
    }
    return prev
  }, { keyCodes: [], error: null })
}

function compileLine(line, instanceAliases, keyCodes) {
  const tokens = line.split(/\s+/)
  const iter = tokens[Symbol.iterator]()

  let item = iter.next()
  while (!item.done) {
    if (item.value === 'alias') {
      item = iter.next()
      if (item.done) {
        return new Error('expected alias name')
      } else {
        const aliasName = item.value
        item = iter.next()
        if (item.done) {
          return new Error('expected alias value')
        }
        else {
          instanceAliases[aliasName] = item.value
          item = iter.next()
        }
      }
    } else {
      const { value } = item
      const keyCode = instanceAliases[value] || aliases[value] || value
      if (!processor.isValidKeyCode(keyCode)) {
        return new Error(`syntax error: '${keyCode}'`)
      }
      keyCodes.push(keyCode)
      item = iter.next()
    }
  }

  return null
}