import React from 'react'
import PropTypes from 'prop-types'

import store from './store'
import execute from './processor/controlUnit'
import mapKeyboardEvent from './processor/keyboardEventMapper'
import Display from './components/Display'
import OptionPanel from './components/OptionPanel'
import Keyboard from './components/Keyboard'
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
    document.addEventListener('keyup', ev => {
      ev.preventDefault()
      const keyCode = mapKeyboardEvent(ev)
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
    const { buffer, stack } = this.state
    return (
      <div className="App">
        <Display buffer={buffer} stack={stack} />
        <OptionPanel/>
        <Keyboard onClick={this.onClick} />
      </div>
    )
  }
}

export default App
