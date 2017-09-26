import axios from 'axios'

import {
  FETCH_GITHUB_PROGRAM_LIST_FULFILLED,
  // FETCH_GITHUB_PROGRAM_LIST_ERROR,
  FETCH_GITHUB_PROGRAM_TEXT_FULFILLED,
  // FETCH_GITHUB_PROGRAM_TEXT_ERROR,
  SET_PROGRAM_TEXT,
  SELECT_PROGRAM_TAB,
} from './actionTypes'

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
      dispatch({
        type: FETCH_GITHUB_PROGRAM_LIST_FULFILLED,
        payload: programs
      })
    })
}

export const fetchProgramText = name => (dispatch, getState) => {
  const { programs } = getState()
  const url = programs[name].url
  axios.get(url, { headers })
    .then(res => {
      dispatch({
        type: FETCH_GITHUB_PROGRAM_TEXT_FULFILLED,
        payload: {
          name: name,
          text: res.data
        }
      })
      dispatch({
        type: SET_PROGRAM_TEXT,
        payload: res.data
      })
      dispatch({ type: SELECT_PROGRAM_TAB })
    })
}
