import { createAction } from 'redux-actions'
import C from '../constants'

const SET_MAIN_PANEL = 'rpnext/ui/SET_MAIN_PANEL'

const initialState = {
  mainPanel: C.KEYPAD
}

export const setMainPanel = createAction(SET_MAIN_PANEL)

export default function reduce(state = initialState, { type, payload }) {
  switch (type) {
    case SET_MAIN_PANEL:
      return {...state, mainPanel: payload}
    default:
      return state
  }
}

export const mainPanelSelector = state => state.ui.mainPanel