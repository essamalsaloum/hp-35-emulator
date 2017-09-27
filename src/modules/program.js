import { createAction } from 'redux-actions'

const SET_GITHUB_TEXT = 'rpnext/program/SET_GITHUB_TEXT'
const SET_TEXT = 'rpnext/program/SET_TEXT'
const CLEAR = 'rpnext/program/CLEAR'
const LOAD_KEYCODES = 'rpnext/program/LOAD_PROGRAM'
const SET_RECORDING = 'rpnext/program/SET_RECORDING'

export const clearProgram = createAction(CLEAR)
export const setProgramText = createAction(SET_TEXT)
export const setGitHubText = createAction(SET_GITHUB_TEXT)
export const loadKeyCodes = createAction(LOAD_KEYCODES)
export const setRecording = createAction(SET_RECORDING)

const initialState = {
  text: '',
  keyCodes: [],
  recording: false,
  fromGitHub: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR:
      return { ...initialState }
    case SET_TEXT:
      return { ...state, text: payload }
    case LOAD_KEYCODES:
      return { ...state, keyCodes: payload }
    case SET_GITHUB_TEXT:
      return { ...state, text: payload, fromGitHub: true, recording: false }
    case SET_RECORDING:
      return {...state, recording: payload}
    default:
      return state
  }
}

export const programTextSelector = state => state.program.text
export const keyCodesSelector = state => state.program.keyCodes
export const fromGitHubSelector = state => state.program.fromGitHub
export const recordingSelector = state => state.program.recording
