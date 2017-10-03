import { createAction } from 'redux-actions'
import processor from '../processor'

const EXECUTE_KEYCODE = 'rpnext/controlUnit/EXECUTE_KEYCODE'
const PROGRAM_STARTING = 'rpnext/controlUnit/PROGRAM_STARTING'
const PROGRAM_STOPPING = 'rpnext/controlUnit/PROGRAM_STOPPING'
const SET_DELAYED = 'rpnext/controlUnit/SET_DELAYED'
const CLEAR_DELAYED = 'rpnext/controlUnit/CLEAR_DELAYED'
const GOTO = 'rpnext/controlUnit/GOTO'
const GOTO_PROGRAM_TOP = 'rpnext/controlUnit/GOTO_PROGRAM_TOP'
const UPDATE_STATE = 'rpnext/controlUnit/UPDATE_STATE'
const LOAD_KEYCODES = 'rpnext/controlUnit/LOAD_KEYCODES'

export const executeKeyCode = createAction(EXECUTE_KEYCODE)
export const setDelayed = createAction(SET_DELAYED)
export const clearDelayed = createAction(CLEAR_DELAYED)
export const gotoProgramTop = createAction(GOTO_PROGRAM_TOP)
export const goto = createAction(GOTO)
export const loadKeyCodes = createAction(LOAD_KEYCODES)

export const programStarting = createAction(PROGRAM_STARTING)
export const programStopping = createAction(PROGRAM_STOPPING)
export const updateProcessorState = createAction(UPDATE_STATE)

export const startProgram = () => (dispatch, getState) => {
  processor.startProgram(dispatch, getState)
}

export const singleStep = () => (dispatch, getState) => {
  if (ipSelector(getState()) < keyCodesSelector(getState()).length) {
    processor.executeNext(dispatch, getState)
  } else {
    dispatch(gotoProgramTop())
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
  isRunning: false,
  isDelayed: false
}

function alu(state, payload) {
  return { ...state, ...processor.execute(state, payload) }
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_KEYCODES:
      return { ...state, keyCodes: payload }
    case EXECUTE_KEYCODE:
      return { ...state, ...alu(state, payload) }
    case UPDATE_STATE:
      return payload
    case GOTO_PROGRAM_TOP:
      return { ...state, ip: 0 }
    case GOTO:
      return { ...state, ip: payload }
    case PROGRAM_STARTING:
      return { ...state, isRunning: true }
    case PROGRAM_STOPPING:
      return { ...state, isRunning: false }
    case SET_DELAYED:
      return { ...state, isDelayed: true }
    case CLEAR_DELAYED:
      return { ...state, isDelayed: false }
    default:
      return state
  }
}

export const processorSelector = state => state.processor
export const stackSelector = state => state.processor.stack
export const bufferSelector = state => state.processor.buffer
export const ipSelector = state => state.processor.ip
export const isRunningSelector = state => state.processor.isRunning
export const isDelayedSelector = state => state.processor.isDelayed
export const keyCodesSelector = state => state.processor.keyCodes
