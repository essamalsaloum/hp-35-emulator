import { createAction } from 'redux-actions'
import { keyCodesSelector } from '../ducks/program'
import processor from '../processor'

const EXECUTE_KEYCODE = 'rpnext/processor/EXECUTE_KEYCODE'
const SET_RUNNING = 'rpnext/processor/RUNNING'
const SET_STOPPING = 'rpnext/processor/STOPPING'
const SET_DELAYED = 'rpnext/processor/SET_DELAYED'
const SET_IP = 'rpnext/processor/SET_IP'
const UPDATE_STATE = 'rpnext/processor/UPDATE_STATE'

export const executeKeyCode = createAction(EXECUTE_KEYCODE)
export const setRunning = createAction(SET_RUNNING)
export const setStopping = createAction(SET_STOPPING)
export const setDelayed = createAction(SET_DELAYED)
export const setIP = createAction(SET_IP)
export const updateProcessorState = createAction(UPDATE_STATE)

export const startProgram = () => () => {
  processor.startProgram()
}

export const stopProgram = () => () => {
  processor.stopProgram()
}

export const singleStep = () => (dispatch, getState) => {
  if (ipSelector(getState()) < keyCodesSelector(getState()).length) {
    processor.executeNext()
  } else {
    dispatch(setIP(0))
  }
}

const initialState = {
  stack: [0, 0, 0, 0],
  stackLift: false,
  memory: 0,
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
    case EXECUTE_KEYCODE:
      return { ...state, ...alu(state, payload) }
    case UPDATE_STATE:
      return payload
    case SET_IP:
      return { ...state, ip: payload }
    case SET_RUNNING:
      return { ...state, running: true }
    case SET_STOPPING:
      return { ...state, running: false }
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
