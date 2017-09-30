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
  const aliasMap = Object.keys(aliases).reduce((prev, name) => {
    prev[name] = [aliases[name]]
    return prev
  }, {})

  const lines = text
    .toLowerCase()
    .split(/\n/)
    .map(line => line.trim())
    .filter(line => line !== '' && !line.startsWith('^'))

  return lines.reduce((prev, line) => {
    let error = null
    if (!line.startsWith('//')) {
      error = compileLine(line, aliasMap, prev.keyCodes)
    }
    if (error && !prev.error) {
      prev.error = error
    }
    return prev
  }, { keyCodes: [], error: null })
}

function compileLine(line, aliasMap, keyCodes) {
  const tokens = line.split(/\s+/)
  const iter = tokens[Symbol.iterator]()

  let item = iter.next()
  while (!item.done) {
    if (item.value === 'alias') {
      item = iter.next()
      if (item.done) {
        return new Error('expected alias name')
      } else {
        const name = item.value
        item = iter.next()
        if (item.done) {
          return new Error('expected alias value')
        }
        else {
          const tokens = [item.value]
          item = iter.next()
          while (!item.done) {
            tokens.push(item.value)
            item = iter.next()
          }
          aliasMap[name] = tokens
        }
      }
    } else {
      const { value } = item
      const tokens = expandAlias(value, aliasMap)
      tokens.forEach(token => {
        if (!processor.isValidKeyCode(token)) {
          return new Error(`syntax error: '${token}'`)
        }
        keyCodes.push(token)
      })
      item = iter.next()
    }
  }
  return null
}

function expandAlias(token, aliasMap, tokens = []) {
  if (aliasMap.hasOwnProperty(token)) {
    aliasMap[token].forEach(t => expandAlias(t, aliasMap, tokens))
  } else {
    tokens.push(token)
  }
  return tokens
}