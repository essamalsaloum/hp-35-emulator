import React from 'react'

import store from './store'
import keyUpHandler from './actions/keyUpHandler'
import Display from './containers/Display'
import OptionPanel from './components/OptionPanel'
import Keyboard from './containers/Keyboard'
import './App.css'

class App extends React.PureComponent {

  componentDidMount() {
    console.log('did mount')
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
        <OptionPanel />
        <Keyboard />
      </div>
    )
  }
}

export default App
