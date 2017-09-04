import React from 'react'
import PropTypes from 'prop-types'

import store from './store'
import execute from './processor/controlUnit'
import keyUpHandler from './processor/keyUpHandler'
import Display from './containers/Display'
import OptionPanel from './components/OptionPanel'
import Keyboard from './components/Keyboard'
import './App.css'

class App extends React.PureComponent {

  static propTypes = {
    test: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  componentWillMount() {
    this.subscription = store.subscribe(state => {
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

  componentDidMount() {
    document.addEventListener('keyup', ev => {
      ev.preventDefault()
      const keyCode = keyUpHandler(ev)
      if (keyCode) {
        this.keyPress(keyCode)
      }
    })
  }

  keyPress(keyCode) {
    store.setState(execute(keyCode)(store.getState()))
  }

  onClick(keyCode) {
    return () => this.keyPress(keyCode)
  }

  render() {
    return (
      <div className="App">
        <Display />
        <OptionPanel />
        <Keyboard onClick={this.onClick} />
      </div>
    )
  }
}

export default App
