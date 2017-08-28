import React from 'react'

import store from './store'
import Display from './containers/Display'
import Keyboard from './containers/Keyboard'

class App extends React.Component {

  componentDidMount() {
    store.notify()
  }

  render() {
    return (
      <div>
        <Display />
        <Keyboard />
      </div>
    )
  }
}

export default App
