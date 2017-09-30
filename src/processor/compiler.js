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
    let error = false
    if (!line.startsWith('//')) {
      const tokens = line.split(/\s+/)
      if (tokens.length === 3 && tokens[0] === 'alias') {
        instanceAliases[tokens[1]] = tokens[2]
      } else {
        line = instanceAliases[line] || aliases[line] || line
        if (processor.isValidKeyCode(line)) {
          prev.keyCodes.push(line)
        } else {
          error = true
        }
      }
    }
    prev.text += line + '\n'
    if (error && !prev.error) {
      prev.error = new Error(`error: ${line}`)
    }
    return prev
  }, {
      text: '',
      keyCodes: [],
      error: null
    })

}

