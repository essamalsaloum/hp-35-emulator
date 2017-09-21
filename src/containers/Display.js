import React from 'react'
import math from 'mathjs'
import store from '../store'

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

export default class Display extends React.PureComponent {

  state = {}

  componentWillMount() {
    this.subscription = store.subscribe(state => {
      const { stack, buffer } = state.processor
      this.setState({ stack, buffer })
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  renderStack(stack, buffer) {
    return stack.map((register, index) => {
      const value = index === 0 ? buffer : math.format(register, { precision: 14 })
      const style = { ...styles.displayRow }
      if (index > 0) {
        style.color = '#808080'
      }
      return (
        <div key={index} style={style}>
          {`${labels[index]}: ${value}`}
        </div>
      )
    }).reverse()
  }

  render() {
    const { stack, buffer } = this.state
    return (
      <div style={styles.root}>
        {this.renderStack(stack, buffer)}
      </div>
    )
  }
}
