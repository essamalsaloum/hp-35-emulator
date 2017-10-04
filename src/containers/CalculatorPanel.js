import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import C from '../constants'
import Display from './Display'
import Keypad from './Keypad'
import MemoryPanel from './MemoryPanel'
import ConstantsPanel from './ConstantsPanel'
import ConversionsPanel from './ConversionsPanel'
import { mainPanelSelector } from '../ducks/ui'
import './CalculatorPanel.css'

class CalculatorPanel extends React.PureComponent {

  static propTypes = {
    mainPanel: PropTypes.string.isRequired
  }

  renderPanel() {
    switch (this.props.mainPanel) {
      case C.KEYPAD_PANEL:
        return <Keypad />
      case C.MEMORY_PANEL:
        return <MemoryPanel />
      case C.CONSTANTS_PANEL:
        return <ConstantsPanel />
      case C.CONVERSIONS_PANEL:
        return <ConversionsPanel />
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