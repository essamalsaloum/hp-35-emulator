import React from 'react'

import store from './store'
import Display from './containers/Display'
import Keyboard from './containers/Keyboard'
import './App.css'

class App extends React.PureComponent {

  componentDidMount() {
    store.notify()
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
