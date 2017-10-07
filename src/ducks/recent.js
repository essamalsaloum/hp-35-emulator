import { createAction } from 'redux-actions'

const SET_RECENT_CONSTANT = 'rpnext/recent/SET_RECENT_CONSTANT'
const SET_RECENT_CONVERSION = 'rpnext/recent/SET_RECENT_CONVERSION'

const initialState = {
  constants: [],
  conversions: []
}
const MAX_HISTORY = 3

export const setRecentConstant = createAction(SET_RECENT_CONSTANT)
export const setRecentConversion = createAction(SET_RECENT_CONVERSION)

export default function reduce(state = initialState, { type, payload }) {
  let { constants, conversions } = state
  switch (type) {
    case SET_RECENT_CONSTANT:
      constants = constants.filter(keyCode => payload !== keyCode)
      constants.unshift(payload)
      return { ...state, constants: constants.slice(0, MAX_HISTORY) }
    case SET_RECENT_CONVERSION:
      conversions = conversions.filter(keyCode => payload !== keyCode)
      conversions.unshift(payload)
      return { ...state, conversions: conversions.slice(0, MAX_HISTORY) }
    default:
      return state

  }
}

export const recentConstantsSelector = state => state.recent.constants
export const recentConversionsSelector = state => state.recent.conversions
