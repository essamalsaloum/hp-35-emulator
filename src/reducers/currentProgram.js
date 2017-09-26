import {
  CLEAR_PROGRAM,
  SET_PROGRAM_TEXT,
  LOAD_PROGRAM,
} from '../actions/actionTypes'

const initialState = {
  text: '',
  keyCodes: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_PROGRAM:
      return { ...initialState }
    case SET_PROGRAM_TEXT:
      return { ...state, text: payload }
    case LOAD_PROGRAM:
      return { ...state, keyCodes: payload }
    default:
      return state
  }
}

export const getProgramText = state => state.currentProgram.text
export const getKeyCodes = state => state.currentProgram.keyCodes
