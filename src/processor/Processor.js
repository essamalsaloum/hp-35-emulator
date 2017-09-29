import C from './keyCodes'
import ControlUnit from './ControlUnit'
import {formatNumber} from './util'

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

  startProgram(state, dispatch) {
    return this.controlUnit.startProgram(state, dispatch)
  }

  stopProgram(dispatch) {
    this.controlUnit.stopProgram(dispatch)
  }

  executeNext(dispatch, state, delay = 0) {
    return this.controlUnit.executeNext(dispatch, state, delay)
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
