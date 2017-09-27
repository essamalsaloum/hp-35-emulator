import {
  EMIT_KEYCODE,
  SET_PROCESSOR_STATE,
  SET_IP,
  SET_RUNNING,
  SET_DELAYED
} from '../actions/actionTypes'
import processor from '../processor'

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
    case EMIT_KEYCODE:
      return { ...state, ...processor.execute(state, payload) }
    case SET_PROCESSOR_STATE:
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
