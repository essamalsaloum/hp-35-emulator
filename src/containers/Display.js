import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { stackSelector, bufferSelector, isDelayedSelector, isRunningSelector, errorSelector } from '../cpu/reducer'
import {formatNumber} from '../cpu/util'
import './Display.css'

const labels = ['x', 'y', 'z', 't']

class Display extends React.Component {

  static propTypes = {
    stack: PropTypes.array,
    buffer: PropTypes.string,
    error: PropTypes.object,
    isDelayed: PropTypes.bool.isRequired,
    isRunning: PropTypes.bool.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    // remove next line disable updates while running calculator program
    return true
    // eslint-disable-next-line no-unreachable
    return !this.props.isRunning ||
      (this.props.isRunning && !nextProps.isRunning) ||
      this.props.isDelayed
  }

  renderStack(stack, buffer, error) {
    return stack.map((register, index) => {
      const displayX = error ? error.message : buffer
      const value = index === 0 ? displayX : formatNumber(register)
      return (
        <div key={index} className="Display--row">
          {`${labels[index]}: ${value}`}
        </div>
      )
    }).reverse()
  }

  render() {
    const { stack, buffer, error } = this.props
    return (
      <div className="Display">
        {this.renderStack(stack, buffer, error)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  stack: stackSelector(state),
  buffer: bufferSelector(state),
  error: errorSelector(state),
  isDelayed: isDelayedSelector(state),
  isRunning: isRunningSelector(state),
})

export default connect(mapStateToProps)(Display)