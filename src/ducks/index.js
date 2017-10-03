import { combineReducers } from 'redux'
import cpu from '../cpu/reducer'
import programPanel from './programPanel'
import programs from './programs'
import program from './program'
import shiftKey from './shiftKey'

export const rootReducer = combineReducers({
  cpu,
  programPanel,
  programs,
  program,
  shiftKey,
})
