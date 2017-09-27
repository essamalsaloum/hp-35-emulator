import { createAction } from 'redux-actions'

const SET = 'rpnext/shiftKey/SET'

export const setShiftKey = createAction(SET)

export default function reduce(state = null, { type, payload }) {
  switch (type) {
    case SET:
      return payload
    default:
      return state
  }
}

export const shiftKeySelector = state => state.shiftKey