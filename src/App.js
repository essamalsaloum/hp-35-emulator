import React from 'react'
import PropTypes from 'prop-types'
import store from './store'
import Display from './containers/Display'
import Keypad from './containers/Keypad'
import ProgramPanel from './containers/ProgramPanel'
import './App.css'

class App extends React.PureComponent {

  static propTypes = {
    test: PropTypes.bool
  }

  componentWillMount() {
    this.subscription = store.subscribe(state => {
      this.setState(state)
      if (!this.props.test) {
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

  render() {
    // tabIndex needed to allow div to receive focus
    return (
      <div className="App">
        <div className="App--main" tabIndex="0">
          <Display />
          <Keypad />
        </div>
        <ProgramPanel />
      </div>
    )
  }
}

export default App
