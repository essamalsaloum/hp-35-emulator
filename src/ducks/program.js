import { createAction } from 'redux-actions'
import {clearKeyCodes} from '../cpu/reducer'

const REFRESH_PROGRAM_TEXT = 'rpnext/program/REFRESH_PROGRAM_TEXT'
const LOAD_MARKDOWN_TEXT = 'rpnext/program/LOAD_MARKDOWN_TEXT'
const CLEAR_PROGRAM = 'rpnext/program/CLEAR_PROGRAM'
const SET_RECORDING = 'rpnext/program/SET_RECORDING'
const CLEAR_RECORDING = 'rpnext/program/CLEAR_RECORDING'

export const clearProgram = () => dispatch => {
  dispatch({type: CLEAR_PROGRAM})
  dispatch(clearKeyCodes())
}

export const refreshProgramText = createAction(REFRESH_PROGRAM_TEXT)
export const loadMarkdownText = createAction(LOAD_MARKDOWN_TEXT)
export const setRecording = createAction(SET_RECORDING)
export const clearRecording = createAction(CLEAR_RECORDING)

const initialState = {
  text: '',
  isRecording: false,
  isMarkdown: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_PROGRAM:
      return { ...state, text: '', isMarkdown: false }
    case REFRESH_PROGRAM_TEXT:
      return { ...state, text: payload, isMarkdown: false }
    case LOAD_MARKDOWN_TEXT:
      return { ...state, text: payload, isMarkdown: true, isRecording: false }
    case SET_RECORDING:
      return { ...state, isRecording: true, isMarkdown: false }
    case CLEAR_RECORDING:
      return { ...state, isRecording: false, isMarkdown: false }
    default:
      return state
  }
}

export const programTextSelector = state => state.program.text
export const isMarkdownSelector = state => state.program.isMarkdown
export const isRecordingSelector = state => state.program.isRecording
