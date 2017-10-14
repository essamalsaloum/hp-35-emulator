import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { programMemorySelector, ipSelector } from '../cpu/reducer'
import InspectToolbar from './InspectToolbar'
import './InspectTab.css'

class InspectTab extends React.PureComponent {

  static propTypes = {
    keyCodes: PropTypes.array,
    ip: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
    this.renderInstruction = this.renderInstruction.bind(this)
  }

  renderLabel(label) {
    return label
      ? <div className="InspectTab--list-item-label">{label}:</div>
      : null
  }

  renderInstruction({ label, opCode, operand = '' }, id) {
    const className = id === this.props.ip
      ? 'InspectTab--list-item-current'
      : 'InspectTab--list-item'
    return (
      <div key={id}>
        {this.renderLabel(label)}
        <div className={`InspectTab--list-item-instruction ${className}`}>{opCode} {operand}</div>
      </div>
    )
  }

  render() {
    return (
      <div className="InspectTab" >
        <div className="InspectTab--list">
          {this.props.keyCodes.map(this.renderInstruction)}
        </div>
        <InspectToolbar />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  keyCodes: programMemorySelector(state),
  ip: ipSelector(state)
})

export default connect(mapStateToProps)(InspectTab)