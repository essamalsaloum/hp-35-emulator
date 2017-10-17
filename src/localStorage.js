import C from './constants'

export const loadState = () => {
  try {
    const serializedState = window.localStorage.getItem('state')
    if (!serializedState) {
      return undefined
    }
    const state = JSON.parse(serializedState)
    return state.cpu.version === C.STATE_VERSION ? state : null
  } catch (err) {
    console.log('error deserializing the state from localStorage')
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    window.localStorage.setItem('state', serializedState)
  } catch (err) {
    console.log('error persisting the state to localStorage')
  }
}