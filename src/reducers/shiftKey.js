import { SET_SHIFT_KEY } from '../actions/actionTypes'

export default function reduce(state = null, { type, payload }) {
  switch (type) {
    case SET_SHIFT_KEY:
      return payload
    default:
      return state
  }
}

export const getShiftKey = state => state.shiftKey