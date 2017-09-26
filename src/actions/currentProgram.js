import { CLEAR_PROGRAM, SET_PROGRAM_TEXT, LOAD_PROGRAM } from './actionTypes'

export const clearProgram = () => ({ type: CLEAR_PROGRAM })
export const setProgramText = text => ({ type: SET_PROGRAM_TEXT, payload: text })
export const loadProgram = keyCodes => ({type: LOAD_PROGRAM, payload: keyCodes})
