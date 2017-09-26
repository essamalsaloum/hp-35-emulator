import { EMIT_KEYCODE, SET_PROCESSOR_STATE, SET_IP, SET_RUNNING } from './actionTypes'
import { getKeyCodes } from '../reducers/currentProgram'
import { getRunning } from '../reducers/processor'
import { getIP } from '../reducers/processor'
import processor from '../processor'

export const emitKeyCode = keyCode => ({ type: EMIT_KEYCODE, payload: keyCode })

export const runToCompletion = (delay = 0) => async (dispatch, getState) => {
  const keyCodes = getKeyCodes(getState())
  let interrupted = false
  dispatch(setRunning(true))
  while (getIP(getState()) < keyCodes.length && !interrupted) {
    if (getRunning(getState())) {
      await processor.executeNext(delay)
    } else {
      interrupted = true
    }
  }
  dispatch(setRunning(false))
  if (!interrupted) {
    dispatch(setIP(0))
  }
}

export const singleStep = () => (dispatch, getState) => {
  if (getIP(getState()) < getKeyCodes(getState()).length) {
    processor.executeNext()
  } else {
    dispatch(setIP(0))
  }
}

export const stopProgram = () => (dispatch) => {
  processor.stopProgram()
  dispatch(setRunning(false))
}

export const setRunning = running => ({ type: SET_RUNNING, payload: running })
export const setIP = ip => ({ type: SET_IP, payload: ip })
export const setProcessorState = processorState => ({ type: SET_PROCESSOR_STATE, payload: processorState })