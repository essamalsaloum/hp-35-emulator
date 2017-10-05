export const loadState = () => {
  try {
    const serializedState = window.localStorage.getItem('state')
    if (!serializedState) {
      return undefined
    }
    return JSON.parse(serializedState)
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