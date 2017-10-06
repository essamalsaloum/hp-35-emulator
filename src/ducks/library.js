import { createAction } from 'redux-actions'
import * as github from '../services/github'
import { loadMarkdownText } from '../ducks/program'
import { showProgramPanel } from '../ducks/ui'

const FETCH_GITHUB_LIST = 'rpnext/programs/FETCH_GITHUB_LIST'
const FETCH_GITHUB_CONTENT = 'rpnext/programs/FETCH_GITHUB_CONTENT'
const SET_LOADING = 'rpnext/programs/SET_LOADING'
const LOADING_DONE = 'rpnext/programs/LOADING_DONE'

const initialState = {
  programs: null,
  error: null,
  loading: false,
}

export const setLoading = createAction(SET_LOADING)
export const clearLoading = createAction(LOADING_DONE)

export const fetchFileList = () => dispatch => {
  dispatch(setLoading())
  github.fetchFileList()
    .then(programs => dispatch(createAction(FETCH_GITHUB_LIST)({ programs })))
    .catch(error => dispatch(createAction(FETCH_GITHUB_LIST)({ error })))
}

export const fetchProgramText = name => (dispatch, getState) => {
  const programs = programsSelector(getState())
  const { url, sha } = programs[name]
  dispatch(setLoading())
  github.fetchProgramText(url, sha)
    .then(text => {
      dispatch(createAction(FETCH_GITHUB_CONTENT)({ name, text }))
      dispatch(loadMarkdownText(text))
      dispatch(showProgramPanel())
    })
    .catch(error => dispatch(createAction(FETCH_GITHUB_CONTENT)({ error })))
}

const fetchProgramListDone = (state, action) => {
  const { error, programs = state.programs } = action.payload
  return { ...state, error, programs, loading: false }
}

const fetchProgramTextDone = (state, action) => {
  const { error, name, text } = action.payload
  if (error) {
    return { ...state, error, loading: false }
  }
  const { programs } = state
  const program = programs[name]
  program.text = text
  return { ...state, programs: { ...programs }, error: null, loading: false }
}

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true }
    case LOADING_DONE:
      return { ...state, loading: false }
    case FETCH_GITHUB_LIST:
      return fetchProgramListDone(state, action)
    case FETCH_GITHUB_CONTENT:
      return fetchProgramTextDone(state, action)
    default:
      return state
  }
}

export const programsSelector = state => state.library.programs
export const errorSelector = state => state.library.error
export const loadingSelector = state => state.library.loading
