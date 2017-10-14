import { createAction } from 'redux-actions'
import cpu from '../cpu'
import { RESET } from '../ducks'

const EXECUTE_KEYCODE = 'rpnext/cpu/EXECUTE_KEYCODE'
const RAISE_ERROR = 'rpnext/cpu/RAISE_ERROR'
const PROGRAM_STARTING = 'rpnext/cpu/PROGRAM_STARTING'
const PROGRAM_STOPPING = 'rpnext/cpu/PROGRAM_STOPPING'
const SET_DELAYED = 'rpnext/cpu/SET_DELAYED'
const CLEAR_DELAYED = 'rpnext/cpu/CLEAR_DELAYED'
const GOTO = 'rpnext/cpu/GOTO'
const GOTO_PROGRAM_TOP = 'rpnext/cpu/GOTO_PROGRAM_TOP'
const UPDATE = 'rpnext/cpu/UPDATE'
const LOAD_PROGRAM_MEMORY = 'rpnext/cpu/LOAD_PROGRAM_MEMORY'
const CLEAR_PROGRAM_MEMORY = 'rpnext/cpu/CLEAR_PROGRAM_MEMORY'

export const executeKeyCode = createAction(EXECUTE_KEYCODE)
export const raiseError = createAction(RAISE_ERROR)
export const setDelayed = createAction(SET_DELAYED)
export const clearDelayed = createAction(CLEAR_DELAYED)
export const gotoProgramTop = createAction(GOTO_PROGRAM_TOP)
export const goto = createAction(GOTO)
export const loadProgramMemory = createAction(LOAD_PROGRAM_MEMORY)
export const clearProgramMemory = createAction(CLEAR_PROGRAM_MEMORY)
export const programStarting = createAction(PROGRAM_STARTING)
export const programStopping = createAction(PROGRAM_STOPPING)
export const updateState = createAction(UPDATE)

export const startProgram = () => (dispatch, getState) => {
  cpu.startProgram(dispatch, getState)
}

export const singleStep = () => (dispatch, getState) => {
  if (ipSelector(getState()) < programMemorySelector(getState()).length) {
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
  lastX: 0,
  buffer: '0',
  stackLift: true,
  entry: false,
  error: null,
  memory: [],
  programMemory: [],
  ip: 0,
  isRunning: false,
  isDelayed: false
}

function alu(state, payload) {
  return { ...state, ...cpu.execute(state, payload) }
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case RESET:
      return { ...initialState }
    case LOAD_PROGRAM_MEMORY:
      return { ...state, programMemory: payload }
    case CLEAR_PROGRAM_MEMORY:
      return { ...state, programMemory: [] }
    case EXECUTE_KEYCODE:
      return { ...state, ...alu(state, payload) }
    case RAISE_ERROR:
      return { ...state, error: payload }
    case UPDATE:
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

export const cpuSelector = state => state.cpu
export const stackSelector = state => state.cpu.stack
export const errorSelector = state => state.cpu.error
export const memorySelector = state => state.cpu.memory
export const bufferSelector = state => state.cpu.buffer
export const ipSelector = state => state.cpu.ip
export const isRunningSelector = state => state.cpu.isRunning
export const isDelayedSelector = state => state.cpu.isDelayed
export const programMemorySelector = state => state.cpu.programMemory
export const entrySelector = state => state.cpu.entry
