import {
  EMIT_KEYCODE,
  SET_PROCESSOR_STATE,
  SET_IP,
  SET_RUNNING,
  SET_DELAYED
} from './actionTypes'
import { keyCodesSelector } from '../reducers/currentProgram'
import { runningSelector } from '../reducers/processor'
import { ipSelector, delayedSelector } from '../reducers/processor'
import processor from '../processor'

const DELAY = 500

export const emitKeyCode = keyCode => ({ type: EMIT_KEYCODE, payload: keyCode })

export const runToCompletion = () => async (dispatch, getState) => {
  const keyCodes = keyCodesSelector(getState())
  let interrupted = false
  dispatch(setRunning(true))
  while (ipSelector(getState()) < keyCodes.length && !interrupted) {
    if (runningSelector(getState())) {
      await processor.executeNext(delayedSelector(getState()) ? DELAY : 0)
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
  if (ipSelector(getState()) < keyCodesSelector(getState()).length) {
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
export const setDelayed = delayed => ({ type: SET_DELAYED, payload: delayed })
export const setIP = ip => ({ type: SET_IP, payload: ip })
export const setProcessorState = processorState => ({ type: SET_PROCESSOR_STATE, payload: processorState })