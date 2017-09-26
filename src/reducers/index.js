import { combineReducers } from 'redux'
import processor from './processor'
import programPanel from './programPanel'
import programs from './programs'
import currentProgram from './currentProgram'
import shiftKey from './shiftKey'

export const rootReducer = combineReducers({
  processor,
  programPanel,
  programs,
  currentProgram,
  shiftKey,
})
