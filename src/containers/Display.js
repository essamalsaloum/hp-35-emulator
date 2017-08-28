import React from 'react'
// import PropTypes from 'prop-types'

import store from '../store'

const labels = ['x', 'y', 'z', 't', 't1', 't2', 't3', 't4', 't5', 't6']

export default class Display extends React.Component {

  state = {}

  componentWillMount() {
    this.subscription = store.subscribe(({ stack, buffer }) => {
      this.setState({ stack, buffer })
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  renderStack() {
    const { stack, buffer } = this.state
    if (!stack) {
      return null
    }

    return stack.map((register, index) => {
      const value = index === 0 ? buffer : register.toString()
      return (
        <div key={index}>{`${labels[index]}: ${value}`}</div>
      )
    }).reverse()
  }

  render() {
    return (
      <div>
        {this.renderStack()}
        <hr />
      </div>
    )
  }
}

