import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { stackSelector, bufferSelector, isDelayedSelector, isRunningSelector, errorSelector, entrySelector } from '../cpu/reducer'
import { formatNumber } from '../cpu/util'
import './Display.css'

const labels = ['x', 'y', 'z', 't']

class Display extends React.Component {

  static propTypes = {
    stack: PropTypes.array,
    buffer: PropTypes.string,
    error: PropTypes.object,
    isDelayed: PropTypes.bool.isRequired,
    isRunning: PropTypes.bool.isRequired,
    entry: PropTypes.bool.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.isRunning ||
      (this.props.isRunning && !nextProps.isRunning) ||
      this.props.isDelayed
  }

  renderStack() {
    const { stack, buffer, error, entry } = this.props
    return stack.map((register, index) => {
      let value
      if (index === 0) {
        if (error) {
          value = error.message
        } else if (entry && buffer !== '0') {
          value = buffer + '_'
        } else {
          value = buffer
        }
      } else {
        value = formatNumber(register)
      }
      return (
        <div key={index} className="Display--row">
          {`${labels[index]}: ${value}`}
        </div>
      )
    }).reverse()
  }

  render() {
    return (
      <div className="Display">
        {this.renderStack()}
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
  entry: entrySelector(state),
})

export default connect(mapStateToProps)(Display)