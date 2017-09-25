import React from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { indigo500, indigo700 } from 'material-ui/styles/colors'
import store from './store'
import MainNavigation from './containers/MainNavigation'
import Display from './containers/Display'
import Keypad from './containers/Keypad'
import ConstantsPanel from './containers/ConstantsPanel'
import ProgramPanel from './containers/ProgramPanel'
import './App.css'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    primary2Color: indigo700
  }
})

class App extends React.PureComponent {

  static propTypes = {
    test: PropTypes.bool
  }

  panels = {
    'keypad': <Keypad className="App--keypad" />,
    'const': <ConstantsPanel className="App--keypad" />
  }

  componentWillMount() {
    this.subscription = store.subscribe(state => {
      this.setState(state)
      if (!this.props.test && process.env.NODE_ENV === 'development') {
        const date = new Date()
        console.group('state ' + date.toLocaleTimeString())
        console.dir(state)
        console.groupEnd()
      }
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  componentDidMount() {
    const main$ = document.querySelector('.App--main')
    const height = main$.offsetHeight
    main$.style.height = height + 'px'
    console.log(height)
  }

  render() {
    const {mode = 'keypad'} = store.getState().keypad
    // tabIndex needed to allow div to receive focus
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <div className="App--main" tabIndex="0">
            <Display />
            {this.panels[mode]}
            <MainNavigation />
          </div>
          <ProgramPanel />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
