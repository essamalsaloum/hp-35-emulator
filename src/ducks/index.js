import { combineReducers } from 'redux'
import cpu from '../cpu/reducer'
import ui from './ui'
import programs from './programs'
import program from './program'

export const rootReducer = combineReducers({
  cpu,
  ui,
  programs,
  program,
})
