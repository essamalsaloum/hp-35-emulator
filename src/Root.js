import React from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { indigo500, indigo700 } from 'material-ui/styles/colors'
import throttle from 'lodash/throttle'
import { saveState } from './localStorage'
import store from './store'
import App from './App'

const THROTTLE_WAIT_MS = 1000

const saveStateHelper = () => {
  const { cpu, program, preferences } = store.getState()
  saveState({ cpu, program, preferences })
}

const saveStateThrottled = throttle(saveStateHelper, THROTTLE_WAIT_MS)

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    primary2Color: indigo700
  }
})

class Root extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <App />
        </MuiThemeProvider>
      </Provider>
    )
  }
}

store.subscribe(() => {
  saveStateThrottled()
})

// window.onbeforeunload = saveStateHelper

export default Root
