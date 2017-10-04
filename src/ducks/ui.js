import { createAction } from 'redux-actions'
import C from '../constants'

const SET_MAIN_PANEL = 'rpnext/ui/SET_MAIN_PANEL'
const SET_SHIFT_KEY = 'rpnext/ui/SET_SHIFT_KEY'
const SHOW_GITHUB_PANEL = 'rpnext/ui/SHOW_GITHUB_PANEL'
const SHOW_PROGRAM_PANEL = 'rpnext/ui/SHOW_PROGRAM_PANEL'


const initialState = {
  mainPanel: C.KEYPAD_PANEL,
  programPanel: C.PROGRAM_PANEL,
  shiftKey: null,
}

export const setMainPanel = createAction(SET_MAIN_PANEL)
export const setShiftKey = createAction(SET_SHIFT_KEY)
export const showProgramPanel = createAction(SHOW_PROGRAM_PANEL)
export const showGitHubPanel = createAction(SHOW_GITHUB_PANEL)

export default function reduce(state = initialState, { type, payload }) {
  switch (type) {
    case SET_MAIN_PANEL:
      return {...state, mainPanel: payload}
    case SET_SHIFT_KEY:
      return {...state, shiftKey: payload}
      case SHOW_PROGRAM_PANEL:
      return {...state, programPanel: C.PROGRAM_PANEL}
    case SHOW_GITHUB_PANEL:
    return {...state, programPanel: C.GITHUB_PANEL}
    default:
      return state
  }
}

export const mainPanelSelector = state => state.ui.mainPanel
export const shiftKeySelector = state => state.ui.shiftKey
export const programPanelSelector = state => state.ui.programPanel