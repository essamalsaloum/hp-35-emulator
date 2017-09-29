import store from '../reduxStore'
import C from './keyCodes'
import aliases from './aliases'
import ControlUnit from './ControlUnit'
import {formatNumber} from './util'
import {keyCodesSelector} from '../ducks/program'
import {ipSelector, runningSelector, delayedSelector} from '../ducks/processor'

const DELAY = 500

export default class Processor {
  controlUnit = new ControlUnit()
  listeners = new Set()

  subscribe(listener) {
    this.listeners.add(listener)
    return {
      remove: () => this.listeners.delete(listener)
    }
  }

  notify(keyCode) {
    setTimeout(() => {
      for (const listener of this.listeners) {
        listener(keyCode)
      }
    })
  }

  async runProgram() {
    const keyCodes = keyCodesSelector(store.getState())
    let interrupted = false
    while (ipSelector(store.getState()) < keyCodes.length && !interrupted) {
      if (runningSelector(store.getState())) {
        await this.executeNext(delayedSelector(store.getState()) ? DELAY : 0)
      } else {
        interrupted = true
      }
    }
    return interrupted
  }

  executeNext(delay = 0) {
    return this.controlUnit.executeNext(store, delay)
  }

  stopProgram() {
    this.controlUnit.stopProgram()
  }

  execute(state, keyCode) {
    const newState = this.controlUnit.execute(state, keyCode)
    this.notifyRecorder(newState, state, keyCode)
    return newState
  }

  notifyRecorder(newState, state, keyCode) {
    const [x] = newState.stack
    if (!(x instanceof Error|| newState.entry)) {
      if (state.entry) {
        this.notify(formatNumber(state.stack[0]))
      }
      if (keyCode !== C.ENTER) {
        this.notify(keyCode)
      }
    }
  }

  compileMarkDownProgram(text) {
    const matches = text.match(/```[\s\S]+?```/g)
    let progText = ''
    if (matches) {
      progText = matches.reduce((buf, match) => {
        buf += match.slice(3, -3) + '\n'
        return buf
      }, '')
    }
    return this.compilePlainTextProgram(progText)
  }

  compilePlainTextProgram(text) {
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
          if (this.controlUnit.isValidKeyCode(line)) {
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

  compileProgram(text) {
    return /\s*#/.test(text) ? this.compileMarkDownProgram(text) : this.compilePlainTextProgram(text)
  }
}
