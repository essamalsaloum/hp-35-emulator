import React from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { indigo500, indigo700 } from 'material-ui/styles/colors'
import { saveState } from './localStorage'
import store from './store'
import App from './App'

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

window.onbeforeunload = () => {
  const { cpu, program, preferences } = store.getState()
  saveState({ cpu, program, preferences })
}

export default Root
