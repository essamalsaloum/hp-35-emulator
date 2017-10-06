import axios from 'axios'

const REPO_URL = `https://api.github.com/repos/RPNext35/rpnext35-programs/contents/programs`

const config = {
  headers: {
    Accept: 'application/vnd.github.v3+json'
  },
  timeout: 10000
}

const cache = new Map()

const createFetchError = error => {
  if (error.response) {
    return new Error(`GitHub response: ${error.response.data.message}`)
  }
  if (error.request) {
    return new Error('GitHub did not respond')
  }
  return new Error(error.message)
}

export const fetchFileList = path => {
  const url = path ? `${REPO_URL}/${path}` : REPO_URL
  const cachedPrograms = cache.get(url)
  if (cachedPrograms) {
    return Promise.resolve(cachedPrograms)
  }
  return axios.get(url, config)
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
      cache.set(url, programs)
      return programs
    })
    .catch(error => {
      throw createFetchError(error)
    })
}

export const fetchProgramText = (url, sha) => {
  const cachedItem = window.localStorage.getItem(url)
  if (cachedItem) {
    try {
      const data = JSON.parse(cachedItem)
      if (data.sha === sha) {
        return Promise.resolve(data.text)
      }
    } catch (err) {
      // fall thru
    }
  }
  return axios.get(url, config)
    .then(res => {
      const text = res.data
      window.localStorage.setItem(url, JSON.stringify({ text, sha }))
      return text
    })
    .catch(error => {
      throw createFetchError(error)
    })
}
