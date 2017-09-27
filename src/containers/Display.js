import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {getStack, getBuffer} from '../reducers/processor'
import math from 'mathjs'
import './Display.css'

const labels = ['x', 'y', 'z', 't']

const styles = {
  root: {
    margin: '0 0 2px 0',
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    boxShadow: 'inset 0 0 4px #888'
  },
  displayRow: {
    margin: '0 8px'
  }
}

class Display extends React.PureComponent {

  static propTypes = {
    stack: PropTypes.array,
    buffer: PropTypes.string
  }

  renderStack(stack, buffer) {
    return stack.map((register, index) => {
      const value = index === 0 ? buffer : math.format(register, { precision: 14 })
      // const style = { ...styles.displayRow }
      // if (index > 0) {
      //   style.color = '#808080'
      // }
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
  stack: getStack(state),
  buffer: getBuffer(state)
})

export default connect(mapStateToProps)(Display)