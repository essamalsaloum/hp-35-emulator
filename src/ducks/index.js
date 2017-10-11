import { combineReducers } from 'redux'
import { createAction } from 'redux-actions'

import cpu from '../cpu/reducer'
import ui from './ui'
import library from './library'
import program from './program'
import preferences from './preferences'

export const RESET = 'rpnext/global/RESET'
export const reset = createAction(RESET)

export const rootReducer = combineReducers({
  cpu,
  ui,
  library,
  program,
  preferences,
})
