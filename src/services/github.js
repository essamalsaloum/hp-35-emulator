import axios from 'axios'

const REPO_URL = `https://api.github.com/repos/RPNext35/rpnext35-programs/contents/programs`

const headers = {
  Accept: 'application/vnd.github.v3+json'
}

const cache = new Map()

export const fetchFileList = path => {
  const url = path ? `${REPO_URL}/${path}` : REPO_URL
  console.log(url)
  const cachedPrograms = cache.get(url)
  if (cachedPrograms) {
    return new Promise((resolve, reject) => {
      try {
        resolve(cachedPrograms)
      } catch (err) {
        reject(err)
      }
    })
  }
  return axios.get(url, { headers })
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
}

export const fetchProgramText = (url, sha) => {
  const cachedItem = cache.get(url)
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
      cache.set(url, JSON.stringify({ text, sha }))
      return text
    })
}