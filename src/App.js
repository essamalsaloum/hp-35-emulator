import React from 'react'
import PropTypes from 'prop-types'

import store from './store'
import { execute } from './processor'
import mapKeyboardEvent from './processor/keyboardEventMapper'
import Display from './components/Display'
import Keyboard from './components/Keyboard'
import ProgramPanel from './containers/ProgramPanel'
import './App.css'

class App extends React.PureComponent {

  static propTypes = {
    test: PropTypes.bool
  }

  state = {}

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
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

  componentDidMount() {
    const elem = document.querySelector('.App__main')
    if (elem) {
      elem.addEventListener('keyup', ev => {
        ev.preventDefault()
        const keyCode = mapKeyboardEvent(ev)
        if (keyCode) {
          this.keyPress(keyCode)
        }
      })
    }
  }

  keyPress(keyCode) {
    store.setState(execute(store.getState(), keyCode))
  }

  onClick(keyCode) {
    return () => this.keyPress(keyCode)
  }

  render() {
    const { buffer, stack, shift } = this.state
    // tabIndex needed to allow div to receive focus
    return (
      <div className="App">
        <div className="App__main" tabIndex="0">
          <Display buffer={buffer} stack={stack} shift={shift} />
          <Keyboard onClick={this.onClick} />
        </div>
        <ProgramPanel />
      </div>
    )
  }
}

export default App
