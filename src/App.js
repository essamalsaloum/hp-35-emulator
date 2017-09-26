/* eslint react/jsx-key: "off" */
import React from 'react'
import PropTypes from 'prop-types'
// import oldStore from './store'
import MainNavigation from './containers/MainNavigation'
import Display from './containers/Display'
import Keypad from './containers/Keypad'
import ConstantsPanel from './containers/ConstantsPanel'
import ProgramPanel from './containers/ProgramPanel'
import './App.css'

class App extends React.PureComponent {

  static propTypes = {
    test: PropTypes.bool
  }

  state = {
    selectedIndex: 0
  }

  panels = [
    (<Keypad className="App--keypad" />),
    (<ConstantsPanel className="App--keypad" />)
  ]

  // componentWillMount() {
  //   this.subscription = oldStore.subscribe(state => {
  //     this.setState(state)
  //     if (!this.props.test && process.env.NODE_ENV === 'development') {
  //       const date = new Date()
  //       console.group('state ' + date.toLocaleTimeString())
  //       console.dir(state)
  //       console.groupEnd()
  //     }
  //   })
  // }

  // componentWillUnmount() {
  //   this.subscription.remove()
  // }

  componentDidMount() {
    const main$ = document.querySelector('.App--main')
    const height = main$.offsetHeight
    main$.style.height = height + 'px'
  }

  render() {
    // tabIndex needed to allow div to receive focus
    return (
      <div className="App">
        <div className="App--main" tabIndex="0">
          <Display />
          {this.panels[this.state.selectedIndex]}
          <MainNavigation onSelect={selectedIndex => this.setState({ selectedIndex })} selectedIndex={this.state.selectedIndex} />
        </div>
        <ProgramPanel />
      </div>
    )
  }
}

export default App
