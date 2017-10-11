/* eslint react/jsx-key: "off" */
import React from 'react'
import PropTypes from 'prop-types'
import CalculatorPanel from './containers/CalculatorPanel'
import ProgramPanel from './containers/ProgramPanel'
import './App.css'

class App extends React.PureComponent {

  static propTypes = {
    test: PropTypes.bool
  }

  componentWillMount() {
    if (/iPhone/.test(navigator.userAgent)) {
      document.querySelector('html').style.fontSize = '18px'
    }
  }

  render() {
    // tabIndex needed to allow div to receive focus
    return (
      <div className="App">
        <CalculatorPanel />
        <ProgramPanel />
      </div>
    )
  }
}

export default App
