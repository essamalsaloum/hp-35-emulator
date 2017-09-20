import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {indigo500, indigo700} from 'material-ui/styles/colors'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    primary2Color: indigo700
  }
})

const Root = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
