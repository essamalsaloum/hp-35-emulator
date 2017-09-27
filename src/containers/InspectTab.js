import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { keyCodesSelector } from '../modules/program'
import { ipSelector } from '../modules/processor'
import InspectToolbar from './InspectToolbar'
import './InspectTab.css'

class InspectTab extends React.PureComponent {

  static propTypes = {
    keyCodes: PropTypes.array,
    ip: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
    this.renderKeyCode = this.renderKeyCode.bind(this)
  }

  renderKeyCode(keyCode, id) {
    const className = id === this.props.ip
      ? 'InspectTab--list-item-current'
      : 'InspectTab--list-item'
    return (
      <div key={id} className={className}>
        {keyCode}
      </div>
    )
  }

  render() {
    return (
      <div className="InspectTab" >
        <div className="InspectTab--list">
          {this.props.keyCodes.map(this.renderKeyCode)}
        </div>
        <InspectToolbar />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  keyCodes: keyCodesSelector(state),
  ip: ipSelector(state)
})

export default connect(mapStateToProps)(InspectTab)