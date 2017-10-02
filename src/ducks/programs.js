import axios from 'axios'
import { createAction } from 'redux-actions'
import { setMarkdownText } from '../ducks/program'
import { selectProgramTab } from '../ducks/programPanel'

const FETCH_GITHUB_LIST = 'rpnext/programs/FETCH_GITHUB_LIST'
const FETCH_GITHUB_CONTENT = 'rpnext/programs/FETCH_GITHUB_CONTENT'

const REPO_URL = `https://api.github.com/repos/RPNext35/rpnext35-programs/contents/programs`

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
          const { name, sha, download_url: url } = item
          prev[name.slice(0, -3)] = {
            url,
            sha,
            text: ''
          }
          return prev
        }, {})
      dispatch(createAction(FETCH_GITHUB_LIST)(programs))
    })
    .catch(err => {
      dispatch(createAction(FETCH_GITHUB_LIST)(err))
    })
}

export const fetchProgramText = name => (dispatch, getState) => {
  const { programs } = getState()
  const { url, sha } = programs[name]
  const cachedItem = window.localStorage.getItem(url)
  if (cachedItem) {
    try {
      const data = JSON.parse(cachedItem)
      if (data.sha === sha) {
        const { text } = data
        dispatch(createAction(FETCH_GITHUB_CONTENT)({ name, text }))
        dispatch(setMarkdownText(text))
        dispatch(selectProgramTab())
        if (process.env.NODE_ENV === 'development') {
          console.log(`localStorage cache hit for: ${name}`)
        }
        return
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  axios.get(url, { headers })
    .then(res => {
      const text = res.data
      window.localStorage.setItem(url, JSON.stringify({ text, sha }))
      dispatch(createAction(FETCH_GITHUB_CONTENT)({ name, text }))
      dispatch(setMarkdownText(res.data))
      dispatch(selectProgramTab())
    })
    .catch(err => {
      dispatch(createAction(FETCH_GITHUB_CONTENT)(err))
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
    case FETCH_GITHUB_LIST:
      return fetchProgramListFulfilled(state, action)
    case FETCH_GITHUB_CONTENT:
      return fetchProgramTextFulfilled(state, action)
    default:
      return state
  }
}

export const programsSelector = state => state.programs