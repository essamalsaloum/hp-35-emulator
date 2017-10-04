import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Display from './Display'
import Keypad from './Keypad'
import MemoryPanel from './MemoryPanel'
import ConstantsPanel from './ConstantsPanel'
import { mainPanelSelector } from '../ducks/ui'
import './CalculatorPanel.css'

class CalculatorPanel extends React.PureComponent {

  static propTypes = {
    mainPanel: PropTypes.string.isRequired
  }

  renderPanel() {
    switch (this.props.mainPanel) {
      case 'keypad':
        return <Keypad />
      case 'memory':
        return <MemoryPanel />
      case 'constants':
        return <ConstantsPanel />
      default:
        return <Keypad />
    }
  }

  render() {
    return (
      <div className="CalculatorPanel" tabIndex="0">
        <Display />
        {this.renderPanel()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  mainPanel: mainPanelSelector(state)
})

export default connect(mapStateToProps)(CalculatorPanel)