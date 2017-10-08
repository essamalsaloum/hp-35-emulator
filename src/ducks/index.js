import { combineReducers } from 'redux'
import cpu from '../cpu/reducer'
import ui from './ui'
import library from './library'
import program from './program'
import preferences from './preferences'

export const rootReducer = combineReducers({
  cpu,
  ui,
  library,
  program,
  preferences,
})
