import { combineReducers } from 'redux'
import cpu from '../cpu/reducer'
import ui from './ui'
import library from './library'
import program from './program'
import recent from './recent'

export const rootReducer = combineReducers({
  cpu,
  ui,
  library,
  program,
  recent,
})
