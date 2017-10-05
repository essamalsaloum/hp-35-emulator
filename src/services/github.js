import axios from 'axios'

const REPO_URL = `https://api.github.com/repos/RPNext35/rpnext35-programs/contents/programs`

const headers = {
  Accept: 'application/vnd.github.v3+json'
}

export const fetchProgramList = () => {
  const cachedPrograms = window.sessionStorage.getItem(REPO_URL)
  if (cachedPrograms) {
    return new Promise((resolve, reject) => {
      try {
        resolve(JSON.parse(cachedPrograms))
      } catch (err) {
        reject(err)
      }
    })
  }
  return axios.get(REPO_URL, { headers })
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
        window.sessionStorage.setItem(REPO_URL, JSON.stringify(programs))
        return programs
    })
}

export const fetchProgramText = (url, sha) => {
  const cachedItem = window.localStorage.getItem(url)
  if (cachedItem) {
    return new Promise((resolve, reject) => {
      try {
        const data = JSON.parse(cachedItem)
        if (data.sha === sha) {
          const { text } = data
          resolve(text)
        }
      } catch (err) {
        reject(err)
      }
    })
  }
  return axios.get(url, { headers })
    .then(res => {
      const text = res.data
      window.localStorage.setItem(url, JSON.stringify({ text, sha }))
      return text
    })
}
