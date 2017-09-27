import axios from 'axios'
import { createAction } from 'redux-actions'
import {setGitHubText} from '../modules/program'
import {selectProgramTab} from '../modules/programPanel'

const FETCH_GITHUB_PROGRAM_LIST = 'rpnext/programs/FETCH_GITHUB_PROGRAM_LIST'
const FETCH_GITHUB_PROGRAM_TEXT = 'rpnext/programs/FETCH_GITHUB_PROGRAM_TEXT'

const REPO_USER = 'remarcmij'
const REPO_NAME = 'calculator-programs'
const REPO_URL = `https://api.github.com/repos/${REPO_USER}/${REPO_NAME}/contents/programs`

const headers = {
  Accept: 'application/vnd.github.v3+json'
}

export const fetchProgramList = () => dispatch => {
  axios.get(REPO_URL, { headers })
    .then(res => {
      const programs = res.data
        .filter(item => item.name.endsWith('.md'))
        .sort((a, b) => a.name.localeCompare(b.name))
        .reduce((prev, item) => {
          const { name, download_url } = item
          prev[name.slice(0, -3)] = {
            url: download_url,
            text: ''
          }
          return prev
        }, {})
      dispatch(createAction(FETCH_GITHUB_PROGRAM_LIST)(programs))
    })
    .catch(err => {
      dispatch(createAction(FETCH_GITHUB_PROGRAM_LIST)(err))
    })
}

export const fetchProgramText = name => (dispatch, getState) => {
  const { programs } = getState()
  const url = programs[name].url
  axios.get(url, { headers })
    .then(res => {
      dispatch(createAction(FETCH_GITHUB_PROGRAM_TEXT)({
        name: name,
        text: res.data
      }))
      dispatch(setGitHubText(res.data))
      dispatch(selectProgramTab())
    })
    .catch(err => {
      dispatch(createAction(FETCH_GITHUB_PROGRAM_TEXT)(err))
    })
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
    case FETCH_GITHUB_PROGRAM_LIST:
      return fetchProgramListFulfilled(state, action)
    case FETCH_GITHUB_PROGRAM_TEXT:
      return fetchProgramTextFulfilled(state, action)
    default:
      return state
  }
}

export const programsSelector = state => state.programs