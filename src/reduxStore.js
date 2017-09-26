import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThink from 'redux-thunk'

import { rootReducer } from './reducers'

const configureStore = () => {
  const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
  return createStore(
    rootReducer,
    /* preloadedState, */
    composeEnhancers(applyMiddleware(ReduxThink))
  )
}

export default configureStore()