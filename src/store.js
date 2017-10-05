import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThink from 'redux-thunk'
import { rootReducer } from './ducks'
import { loadState } from './localStorage'

const configureStore = () => {
  const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
  return createStore(
    rootReducer,
    loadState(),
    composeEnhancers(applyMiddleware(ReduxThink))
  )
}

export default configureStore()