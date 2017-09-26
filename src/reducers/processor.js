import { EMIT_KEYCODE, SET_PROCESSOR_STATE, SET_IP, SET_RUNNING } from '../actions/actionTypes'
import processor from '../processor'

const initialState = {
  stack: [0, 0, 0, 0],
  buffer: '0',
  stackLift: false,
  entry: true,
  memory: 0,
  ip: 0,
  running: false
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
      return {...state, running: payload}
    default:
      return state
  }
}

export const getProcessorState = state => state.processor
export const getStack = state => state.processor.stack
export const getBuffer = state => state.processor.buffer
export const getStackLift = state => state.processor.stackLift
export const getEntry = state => state.processor.entry
export const getMemory = state => state.processor.memory
export const getIP = state => state.processor.ip
export const getRunning = state => state.processor.running
