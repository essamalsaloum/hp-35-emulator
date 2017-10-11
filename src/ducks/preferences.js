import { createAction } from 'redux-actions'
import { RESET } from './index'

const SET_RECENT_CONSTANT = 'rpnext/preferences/SET_RECENT_CONSTANT'
const SET_RECENT_CONVERSION = 'rpnext/preferences/SET_RECENT_CONVERSION'

const initialState = {
  recentConstants: [],
  recentConversions: []
}
const MAX_HISTORY = 3

export const setRecentConstant = createAction(SET_RECENT_CONSTANT)
export const setRecentConversion = createAction(SET_RECENT_CONVERSION)

export default function reduce(state = initialState, { type, payload }) {
  let { recentConstants, recentConversions } = state
  switch (type) {
    case RESET:
      return { ...initialState }
    case SET_RECENT_CONSTANT:
      recentConstants = recentConstants.filter(keyCode => payload !== keyCode)
      recentConstants.unshift(payload)
      return { ...state, recentConstants: recentConstants.slice(0, MAX_HISTORY) }
    case SET_RECENT_CONVERSION:
      recentConversions = recentConversions.filter(keyCode => payload !== keyCode)
      recentConversions.unshift(payload)
      return { ...state, recentConversions: recentConversions.slice(0, MAX_HISTORY) }
    default:
      return state

  }
}

export const recentConstantsSelector = state => state.preferences.recentConstants
export const recentConversionsSelector = state => state.preferences.recentConversions
