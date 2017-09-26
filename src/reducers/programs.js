import {
  FETCH_GITHUB_PROGRAM_LIST_FULFILLED,
  FETCH_GITHUB_PROGRAM_TEXT_FULFILLED,
} from '../actions/actionTypes'

const fetchProgramListFulfilled = (state, action) => {
  const programs = action.payload
  return { ...state, ...programs }
}

const fetchProgramTextFulfilled = (state, action) => {
  const { name, text } = action.payload
  const program = { ...state[name], text }
  return { ...state, [name]: program }
}

export default function reduce(state = null, action) {
  switch (action.type) {
    case FETCH_GITHUB_PROGRAM_LIST_FULFILLED:
      return fetchProgramListFulfilled(state, action)
    case FETCH_GITHUB_PROGRAM_TEXT_FULFILLED:
      return fetchProgramTextFulfilled(state, action)
    default:
      return state
  }
}

export const getPrograms = state => state.programs