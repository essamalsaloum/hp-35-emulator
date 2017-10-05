import { createAction } from 'redux-actions'
import * as github from '../services/github'
import { loadMarkdownText } from '../ducks/program'
import { showProgramPanel } from '../ducks/ui'

const FETCH_GITHUB_LIST = 'rpnext/programs/FETCH_GITHUB_LIST'
const FETCH_GITHUB_CONTENT = 'rpnext/programs/FETCH_GITHUB_CONTENT'

export const fetchFileList = () => dispatch => {
  github.fetchFileList()
    .then(programs => dispatch(createAction(FETCH_GITHUB_LIST)(programs)))
    .catch(err => dispatch(createAction(FETCH_GITHUB_LIST)(err)))
}

export const fetchProgramText = name => (dispatch, getState) => {
  const { programs } = getState()
  const { url, sha } = programs[name]
  github.fetchProgramText(url, sha)
  .then(text => {
    dispatch(createAction(FETCH_GITHUB_CONTENT)({ name, text }))
    dispatch(loadMarkdownText(text))
    dispatch(showProgramPanel())
  })
  .catch(err => dispatch(createAction(FETCH_GITHUB_CONTENT)(err)))
}

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
    case FETCH_GITHUB_LIST:
      return fetchProgramListFulfilled(state, action)
    case FETCH_GITHUB_CONTENT:
      return fetchProgramTextFulfilled(state, action)
    default:
      return state
  }
}

export const programsSelector = state => state.programs