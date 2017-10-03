import { createAction } from 'redux-actions'
import cpu from '../cpu'

const EXECUTE_KEYCODE = 'rpnext/cpu/EXECUTE_KEYCODE'
const PROGRAM_STARTING = 'rpnext/cpu/PROGRAM_STARTING'
const PROGRAM_STOPPING = 'rpnext/cpu/PROGRAM_STOPPING'
const SET_DELAYED = 'rpnext/cpu/SET_DELAYED'
const CLEAR_DELAYED = 'rpnext/cpu/CLEAR_DELAYED'
const GOTO = 'rpnext/cpu/GOTO'
const GOTO_PROGRAM_TOP = 'rpnext/cpu/GOTO_PROGRAM_TOP'
const UPDATE_STATE = 'rpnext/cpu/UPDATE_STATE'
const LOAD_KEYCODES = 'rpnext/cpu/LOAD_KEYCODES'

export const executeKeyCode = createAction(EXECUTE_KEYCODE)
export const setDelayed = createAction(SET_DELAYED)
export const clearDelayed = createAction(CLEAR_DELAYED)
export const gotoProgramTop = createAction(GOTO_PROGRAM_TOP)
export const goto = createAction(GOTO)
export const loadKeyCodes = createAction(LOAD_KEYCODES)

export const programStarting = createAction(PROGRAM_STARTING)
export const programStopping = createAction(PROGRAM_STOPPING)
export const updateState = createAction(UPDATE_STATE)

export const startProgram = () => (dispatch, getState) => {
  cpu.startProgram(dispatch, getState)
}

export const singleStep = () => (dispatch, getState) => {
  if (ipSelector(getState()) < keyCodesSelector(getState()).length) {
    cpu.executeNext(dispatch, getState)
  } else {
    dispatch(gotoProgramTop())
  }
}

export const stopProgram = () => (dispatch) => {
  cpu.stopProgram(dispatch)
}

const initialState = {
  stack: [0, 0, 0, 0],
  stackLift: false,
  memory: [],
  keyCodes: [],
  ip: 0,
  entry: true,
  buffer: '0',
  isRunning: false,
  isDelayed: false
}

function alu(state, payload) {
  return { ...state, ...cpu.execute(state, payload) }
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

export const processorSelector = state => state.cpu
export const stackSelector = state => state.cpu.stack
export const bufferSelector = state => state.cpu.buffer
export const ipSelector = state => state.cpu.ip
export const isRunningSelector = state => state.cpu.isRunning
export const isDelayedSelector = state => state.cpu.isDelayed
export const keyCodesSelector = state => state.cpu.keyCodes
