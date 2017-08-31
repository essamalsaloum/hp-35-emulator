import React from 'react'

import store from './store'
import keyUpHandler from './actions/keyUpHandler'
import Display from './containers/Display'
import Keyboard from './containers/Keyboard'
import './App.css'

class App extends React.PureComponent {

  componentDidMount() {
    store.notify()

    document.addEventListener('keyup', ev => {
      ev.preventDefault()
      keyUpHandler(ev)
    })
  }

  render() {
    return (
      <div className="App">
        <Display />
        <Keyboard />
      </div>
    )
  }
}

export default App
