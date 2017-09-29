import { createAction } from 'redux-actions'
import { keyCodesSelector } from '../ducks/program'
import processor from '../processor'

const EXECUTE_KEYCODE = 'rpnext/processor/EXECUTE_KEYCODE'
const SET_RUNNING = 'rpnext/processor/SET_RUNNING'
const SET_DELAYED = 'rpnext/processor/SET_DELAYED'
const SET_IP = 'rpnext/processor/SET_IP'
const SET_STATE = 'rpnext/processor/SET_STATE'

export const executeKeyCode = createAction(EXECUTE_KEYCODE)
export const setRunning = createAction(SET_RUNNING)
export const setDelayed = createAction(SET_DELAYED)
export const setIP = createAction(SET_IP)
export const setProcessorState = createAction(SET_STATE)

export const runToCompletion = () => async (dispatch) => {
  dispatch(setRunning(true))
  const interrupted = await processor.runProgram()
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
  error: null,
  running: false,
  delayed: false
}

export default function reduce(state = initialState, { type, payload }) {
  switch (type) {
    case EXECUTE_KEYCODE:
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
