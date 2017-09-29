import store from '../reduxStore'
import C from './keyCodes'
import ControlUnit from './ControlUnit'
import {formatNumber} from './util'
import {keyCodesSelector} from '../ducks/program'
import {ipSelector, runningSelector, delayedSelector, setRunning, setStopping, setIP} from '../ducks/processor'

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

  async startProgram() {
    const keyCodes = keyCodesSelector(store.getState())
    let interrupted = false
    store.dispatch(setRunning())
    while (ipSelector(store.getState()) < keyCodes.length && !interrupted) {
      if (runningSelector(store.getState())) {
        await this.executeNext(delayedSelector(store.getState()) ? DELAY : 0)
      } else {
        interrupted = true
      }
    }
    store.dispatch(setStopping())
    if (!interrupted) {
      store.dispatch(setIP(0))
    }
  }

  stopProgram() {
    this.controlUnit.stopProgram()
    store.dispatch(setStopping())
  }

  executeNext(delay = 0) {
    return this.controlUnit.executeNext(store, delay)
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
}
