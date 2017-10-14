import { createAction } from 'redux-actions'
import C from '../constants'
import K from '../cpu/keyCodes'
import { RESET, reset } from './index'
import { executeKeyCode } from '../cpu/reducer'

const SET_MAIN_PANEL = 'rpnext/ui/SET_MAIN_PANEL'
const SET_SHIFT_KEY = 'rpnext/ui/SET_SHIFT_KEY'
const SHOW_GITHUB_PANEL = 'rpnext/ui/SHOW_GITHUB_PANEL'
const SHOW_PROGRAM_PANEL = 'rpnext/ui/SHOW_PROGRAM_PANEL'
const RESET_KEYPAD = 'rpnext/ui/RESET_KEYPAD'
const KEY_PRESSED = 'rpnext/ui/KEY_PRESSED'

const initialState = {
  mainPanel: C.KEYPAD_PANEL,
  programPanel: C.PROGRAM_PANEL,
  shiftKey: null,
  lastKeyCode: null,
}

export const setMainPanel = createAction(SET_MAIN_PANEL)
export const setShiftKey = createAction(SET_SHIFT_KEY)
export const showProgramPanel = createAction(SHOW_PROGRAM_PANEL)
export const showGitHubPanel = createAction(SHOW_GITHUB_PANEL)
export const resetKeypad = createAction(RESET_KEYPAD)

export const keyPressed = keyCode => (dispatch, getState) => {
  const state = getState()
  const shiftKey = shiftKeySelector(state)
  const lastKeyCode = lastKeyCodeSelector(state)

  const submitKeyCode = () => {
    dispatch({ type: KEY_PRESSED, payload: keyCode })
    dispatch(executeKeyCode({ opCode: keyCode }))
    if (shiftKey) {
      dispatch(setShiftKey(null))
    }
  }

  switch (keyCode) {
    case K.SHIFT_UP:
      dispatch(setShiftKey(shiftKey === K.SHIFT_UP ? null : K.SHIFT_UP))
      break
    case K.SHIFT_DOWN:
      dispatch(setShiftKey(shiftKey === K.SHIFT_DOWN ? null : K.SHIFT_DOWN))
      break
    case K.HYPER:
      dispatch(setShiftKey(K.HYPER))
      break
    case K.CONV:
      dispatch(setShiftKey(K.CONV))
      break
    case K.MEM:
      dispatch(setMainPanel(C.MEMORY_PANEL))
      break
    case K.CONST:
      dispatch(setMainPanel(C.CONSTANTS_PANEL))
      break
    case K.NOOP:
      return
    case K.CANCEL:
      if (shiftKey) {
        dispatch(setShiftKey(null))
      } else {
        dispatch(executeKeyCode({ opCode: K.CANCEL }))
      }
      break
    case K.RESET:
      dispatch(reset())
      break
    case K.STO:
    case K.RCL:
      dispatch({ type: KEY_PRESSED, payload: keyCode })
      dispatch(setShiftKey(K.ALPHA))
      break
    case K.ADD:
      if (lastKeyCode === K.STO) {
        dispatch({ type: KEY_PRESSED, payload: K.STO_ADD })
      } else if (lastKeyCode === K.RCL) {
        dispatch({ type: KEY_PRESSED, payload: K.RCL_ADD })
      } else {
        submitKeyCode()
      }
      break
    case K.SUB:
      if (lastKeyCode === K.STO) {
        dispatch({ type: KEY_PRESSED, payload: K.STO_SUB })
      } else if (lastKeyCode === K.RCL) {
        dispatch({ type: KEY_PRESSED, payload: K.RCL_SUB })
      } else {
        submitKeyCode()
      }
      break
    case K.MUL:
      if (lastKeyCode === K.STO) {
        dispatch({ type: KEY_PRESSED, payload: K.STO_MUL })
      } else if (lastKeyCode === K.RCL) {
        dispatch({ type: KEY_PRESSED, payload: K.RCL_MUL })
      } else {
        submitKeyCode()
      }
      break
    case K.DIV:
      if (lastKeyCode === K.STO) {
        dispatch({ type: KEY_PRESSED, payload: K.STO_DIV })
      } else if (lastKeyCode === K.RCL) {
        dispatch({ type: KEY_PRESSED, payload: K.RCL_DIV })
      } else {
        submitKeyCode()
      }
      break
    default:
      if (shiftKey === K.ALPHA) {
        const lastKeyCode = lastKeyCodeSelector(state)
        keyCode = `${lastKeyCode} ${keyCode}`
        dispatch(setShiftKey(null))
        dispatch(executeKeyCode({ opCode: lastKeyCode, operand: keyCode }))
      } else {
        submitKeyCode()
      }
  }
}

export default function reduce(state = initialState, { type, payload }) {
  switch (type) {
    case RESET:
      return { ...initialState }
    case SET_MAIN_PANEL:
      return { ...state, mainPanel: payload }
    case SET_SHIFT_KEY:
      return { ...state, shiftKey: payload }
    case SHOW_PROGRAM_PANEL:
      return { ...state, programPanel: C.PROGRAM_PANEL }
    case SHOW_GITHUB_PANEL:
      return { ...state, programPanel: C.GITHUB_PANEL }
    case RESET_KEYPAD:
      return { ...state, mainPanel: C.KEYPAD_PANEL, shiftKey: null }
    case KEY_PRESSED:
      return { ...state, lastKeyCode: payload }
    default:
      return state
  }
}

export const mainPanelSelector = state => state.ui.mainPanel
export const shiftKeySelector = state => state.ui.shiftKey
export const programPanelSelector = state => state.ui.programPanel
export const lastKeyCodeSelector = state => state.ui.lastKeyCode
