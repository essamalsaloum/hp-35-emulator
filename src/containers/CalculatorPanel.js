import React from 'react'
import PropTypes from 'prop-types'
import Display from './Display'
import Keypad from './Keypad'
import ConstantsPanel from './ConstantsPanel'
import MainNavigation from './MainNavigation'
import './CalculatorPanel.css'

export default class CalculatorPanel extends React.PureComponent {

  static propTypes = {
    selectedIndex: PropTypes.number
  }

  state = {
    selectedIndex: 0
  }

  render() {
    const { selectedIndex } = this.state
    return (
      <div className="CalculatorPanel" tabIndex="0">
        <Display />
        {selectedIndex === 0 ? <Keypad /> : <ConstantsPanel />}
        <MainNavigation onSelect={selectedIndex => this.setState({ selectedIndex })} selectedIndex={this.state.selectedIndex} />
      </div>
    )
  }
}
