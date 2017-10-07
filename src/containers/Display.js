import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { stackSelector, bufferSelector, isDelayedSelector, isRunningSelector } from '../cpu/reducer'
import math from 'mathjs'
import './Display.css'

const labels = ['x', 'y', 'z', 't']

class Display extends React.Component {

  static propTypes = {
    stack: PropTypes.array,
    buffer: PropTypes.string,
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

  renderStack(stack, buffer) {
    return stack.map((register, index) => {
      const value = index === 0 ? buffer : math.format(register, { precision: 14 })
      return (
        <div key={index} className="Display--row">
          {`${labels[index]}: ${value}`}
        </div>
      )
    }).reverse()
  }

  render() {
    const { stack, buffer } = this.props
    return (
      <div className="Display">
        {this.renderStack(stack, buffer)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  stack: stackSelector(state),
  buffer: bufferSelector(state),
  isDelayed: isDelayedSelector(state),
  isRunning: isRunningSelector(state),
})

export default connect(mapStateToProps)(Display)