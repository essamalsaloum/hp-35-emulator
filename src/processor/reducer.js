import { createAction } from 'redux-actions'
import processor from '../processor'

const EXECUTE_KEYCODE = 'rpnext/processor/EXECUTE_KEYCODE'
const SET_RUNNING = 'rpnext/processor/RUNNING'
const SET_STOPPING = 'rpnext/processor/STOPPING'
const SET_DELAYED = 'rpnext/processor/SET_DELAYED'
const CLEAR_DELAYED = 'rpnext/processor/CLEAR_DELAYED'
const SET_IP = 'rpnext/processor/SET_IP'
const RESET_IP = 'rpnext/processor/RESET_IP'
const UPDATE_STATE = 'rpnext/processor/UPDATE_STATE'
const LOAD_PROGRAM = 'rpnext/processor/LOAD_PROGRAM'

export const executeKeyCode = createAction(EXECUTE_KEYCODE)
export const setDelayed = createAction(SET_DELAYED)
export const clearDelayed = createAction(CLEAR_DELAYED)
export const resetIP = createAction(RESET_IP)
export const setIP = createAction(SET_IP)
export const loadProgram = createAction(LOAD_PROGRAM)

export const setRunning = createAction(SET_RUNNING)
export const setStopping = createAction(SET_STOPPING)
export const updateProcessorState = createAction(UPDATE_STATE)

export const startProgram = () => (dispatch, getState) => {
  processor.startProgram(dispatch, getState)
}

export const singleStep = () => (dispatch, getState) => {
  if (ipSelector(getState()) < keyCodesSelector(getState()).length) {
    processor.executeNext(dispatch, getState)
  } else {
    dispatch(resetIP())
  }
}

export const stopProgram = () => (dispatch) => {
  processor.stopProgram(dispatch)
}

const initialState = {
  stack: [0, 0, 0, 0],
  stackLift: false,
  memory: 0,
  keyCodes: [],
  ip: 0,
  entry: true,
  buffer: '0',
  running: false,
  delayed: false
}

function alu(state, payload) {
  return { ...state, ...processor.execute(state, payload) }
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_PROGRAM:
      return { ...state, keyCodes: payload }
    case EXECUTE_KEYCODE:
      return { ...state, ...alu(state, payload) }
    case UPDATE_STATE:
      return payload
    case RESET_IP:
      return { ...state, ip: 0 }
    case SET_IP:
      return { ...state, ip: payload }
    case SET_RUNNING: {
      return { ...state, running: true }
    }
    case SET_STOPPING:
      return { ...state, running: false }
    case SET_DELAYED:
      return { ...state, delayed: true }
    case CLEAR_DELAYED:
      return { ...state, delayed: false }
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
export const keyCodesSelector = state => state.processor.keyCodes
