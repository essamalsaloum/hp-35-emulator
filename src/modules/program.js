import { createAction } from 'redux-actions'

const SET_GITHUB_TEXT = 'rpnext/program/SET_GITHUB_TEXT'
const SET_TEXT = 'rpnext/program/SET_TEXT'
const CLEAR = 'rpnext/program/CLEAR'
const LOAD_KEYCODES = 'rpnext/program/LOAD_PROGRAM'

export const clearProgram = createAction(CLEAR)
export const setProgramText = createAction(SET_TEXT)
export const setGitHubText = createAction(SET_GITHUB_TEXT)
export const loadKeyCodes = createAction(LOAD_KEYCODES)

const initialState = {
  text: '',
  keyCodes: [],
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
      return { ...state, text: payload, fromGitHub: true }
    default:
      return state
  }
}

export const programTextSelector = state => state.program.text
export const keyCodesSelector = state => state.program.keyCodes
export const fromGitHubSelector = state => state.program.fromGitHub
