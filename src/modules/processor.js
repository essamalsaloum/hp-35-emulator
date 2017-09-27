import { createAction } from 'redux-actions'
import { keyCodesSelector } from '../modules/program'
import processor from '../processor'

const INJECT_KEYCODE = 'rpnext/processor/INJECT_KEYCODE'
const SET_RUNNING = 'rpnext/processor/SET_RUNNING'
const SET_DELAYED = 'rpnext/processor/SET_DELAYED'
const SET_IP = 'rpnext/processor/SET_IP'
const SET_STATE = 'rpnext/processor/SET_STATE'

const DELAY = 500

export const injectKeyCode = createAction(INJECT_KEYCODE)
export const setRunning = createAction(SET_RUNNING)
export const setDelayed = createAction(SET_DELAYED)
export const setIP = createAction(SET_IP)
export const setProcessorState = createAction(SET_STATE)

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

const initialState = {
  stack: [0, 0, 0, 0],
  buffer: '0',
  stackLift: false,
  entry: true,
  memory: 0,
  ip: 0,
  running: false,
  delayed: false
}

export default function reduce(state = initialState, { type, payload }) {
  switch (type) {
    case INJECT_KEYCODE:
      return { ...state, ...processor.execute(state, payload) }
    case SET_STATE:
      return payload
    case SET_IP:
      return { ...state, ip: payload }
    case SET_RUNNING:
      return { ...state, running: payload }
    case SET_DELAYED:
      return { ...state, delayed: payload }
    default:
      return state
  }
}

export const processorStateSelector = state => state.processor
export const stackSelector = state => state.processor.stack
export const bufferSelector = state => state.processor.buffer
export const ipSelector = state => state.processor.ip
export const runningSelector = state => state.processor.running
export const delayedSelector = state => state.processor.delayed
