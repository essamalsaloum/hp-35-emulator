import axios from 'axios'
import { createAction } from 'redux-actions'

import {
  FETCH_GITHUB_PROGRAM_LIST,
  FETCH_GITHUB_PROGRAM_TEXT,
  SET_GITHUB_PROGRAM_TEXT,
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
      dispatch(createAction(SET_GITHUB_PROGRAM_TEXT)(res.data))
      dispatch(createAction(SELECT_PROGRAM_TAB)())
    })
    .catch(err => {
      dispatch(createAction(FETCH_GITHUB_PROGRAM_TEXT)(err))
    })
}
