import { createAction } from 'redux-actions'
import processor from '../processor'

const EXECUTE_KEYCODE = 'rpnext/controlUnit/EXECUTE_KEYCODE'
const SET_RUN_FLAG = 'rpnext/controlUnit/SET_RUN_FLAG'
const CLEAR_RUN_FLAG = 'rpnext/controlUnit/CLEAR_RUN_FLAG'
const SET_DELAYED_FLAG = 'rpnext/controlUnit/SET_DELAYED_FLAG'
const CLEAR_DELAYED_FLAG = 'rpnext/controlUnit/CLEAR_DELAYED_FLAG'
const SET_IP = 'rpnext/controlUnit/SET_IP'
const RESET_IP = 'rpnext/controlUnit/RESET_IP'
const UPDATE_STATE = 'rpnext/controlUnit/UPDATE_STATE'
const LOAD_PROGRAM = 'rpnext/controlUnit/LOAD_PROGRAM'

export const executeKeyCode = createAction(EXECUTE_KEYCODE)
export const setDelayedFlag = createAction(SET_DELAYED_FLAG)
export const clearDelayedFlag = createAction(CLEAR_DELAYED_FLAG)
export const resetIP = createAction(RESET_IP)
export const setIP = createAction(SET_IP)
export const loadProgram = createAction(LOAD_PROGRAM)

export const setRunFlag = createAction(SET_RUN_FLAG)
export const clearRunFlag = createAction(CLEAR_RUN_FLAG)
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
  runFlag: false,
  delayedFlag: false
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
    case SET_RUN_FLAG: {
      return { ...state, runFlag: true }
    }
    case CLEAR_RUN_FLAG:
      return { ...state, runFlag: false }
    case SET_DELAYED_FLAG:
      return { ...state, delayedFlag: true }
    case CLEAR_DELAYED_FLAG:
      return { ...state, delayedFlag: false }
    default:
      return state
  }
}

export const processorStateSelector = state => state.processor
export const stackSelector = state => state.processor.stack
export const bufferSelector = state => state.processor.buffer
export const ipSelector = state => state.processor.ip
export const runFlagSelector = state => state.processor.runFlag
export const delayedFlagSelector = state => state.processor.delayedFlag
export const keyCodesSelector = state => state.processor.keyCodes
