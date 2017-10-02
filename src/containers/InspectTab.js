import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { instructionsSelector, ipSelector } from '../processor/reducer'
import InspectToolbar from './InspectToolbar'
import './InspectTab.css'

class InspectTab extends React.PureComponent {

  static propTypes = {
    instructions: PropTypes.array,
    ip: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
    this.renderInstruction = this.renderInstruction.bind(this)
  }

  renderInstruction(instruction, id) {
    const className = id === this.props.ip
      ? 'InspectTab--list-item-current'
      : 'InspectTab--list-item'
    return (
      <div key={id} className={className}>
        {instruction}
      </div>
    )
  }

  render() {
    return (
      <div className="InspectTab" >
        <div className="InspectTab--list">
          {this.props.instructions.map(this.renderInstruction)}
        </div>
        <InspectToolbar />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  instructions: instructionsSelector(state),
  ip: ipSelector(state)
})

export default connect(mapStateToProps)(InspectTab)