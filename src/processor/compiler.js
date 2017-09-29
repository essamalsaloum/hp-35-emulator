import aliases from './aliases'
import processor from './index'

export default function compileProgram(text) {
  return /^\s*```/gm.test(text)
    ? compileMarkDownProgram(text)
    : compilePlainTextProgram(text)
}

function compileMarkDownProgram(text) {
  const matches = text.match(/^```[\s\S]+?```/gm)
  let progText = ''
  if (matches) {
    progText = matches.reduce((buf, match) => {
      buf += match.slice(3, -3) + '\n'
      return buf
    }, '')
  }
  return compilePlainTextProgram(progText)
}

function compilePlainTextProgram(text) {
  const instanceAliases = {}

  const lines = text
    .toLowerCase()
    .split(/\n/)
    .map(line => line.trim())
    .filter(line => line !== '' && !line.startsWith('^'))

  return lines.reduce((acc, line) => {
    let error = false
    if (!line.startsWith('//')) {
      const tokens = line.split(/\s+/)
      if (tokens.length === 3 && tokens[0] === 'alias') {
        instanceAliases[tokens[1]] = tokens[2]
      } else {
        line = instanceAliases[line] || aliases[line] || line
        if (processor.isValidKeyCode(line)) {
          acc.keyCodes.push(line)
        } else {
          error = true
        }
      }
    }
    acc.text += line + '\n'
    if (error && !acc.error) {
      acc.error = new Error(`error: ${line}`)
    }
    return acc
  }, {
      text: '',
      keyCodes: [],
      error: null
    })

}

