import axios from 'axios'

const REPO_USER = 'remarcmij'
const REPO_NAME = 'calculator-programs'
const REPO_URL = `https://api.github.com/repos/${REPO_USER}/${REPO_NAME}/contents/programs`

const mapItems = items => items.reduce((prev, item) => {
  const { name, download_url } = item
  if (name.endsWith('.md')) {
    prev[name.slice(0, -3)] = download_url
  }
  return prev
}, {})

const comparator = (a, b) => a.name.localeCompare(b.name)

export function loadProgramList() {
  return axios.get(REPO_URL, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  }).then(res => res.data.sort(comparator))
    .then(mapItems)
}

export function loadProgram(url) {
  return axios.get(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  }).then(res => res.data)
}