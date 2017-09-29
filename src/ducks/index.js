import { combineReducers } from 'redux'
import processor from '../processor/reducer'
import programPanel from './programPanel'
import programs from './programs'
import program from './program'
import shiftKey from './shiftKey'

export const rootReducer = combineReducers({
  processor,
  programPanel,
  programs,
  program,
  shiftKey,
})
