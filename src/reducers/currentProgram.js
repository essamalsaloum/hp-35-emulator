import {
  CLEAR_PROGRAM,
  SET_PROGRAM_TEXT,
  LOAD_PROGRAM,
  SET_GITHUB_PROGRAM_TEXT,
} from '../actions/actionTypes'

const initialState = {
  text: '',
  keyCodes: [],
  fromGitHub: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_PROGRAM:
      return { ...initialState }
    case SET_PROGRAM_TEXT:
      return { ...state, text: payload }
    case LOAD_PROGRAM:
      return { ...state, keyCodes: payload }
    case SET_GITHUB_PROGRAM_TEXT:
      return { ...state, text: payload, fromGitHub: true }
    default:
      return state
  }
}

export const programTextSelector = state => state.currentProgram.text
export const keyCodesSelector = state => state.currentProgram.keyCodes
export const fromGitHubSelector = state => state.currentProgram.fromGitHub
