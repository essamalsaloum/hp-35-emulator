import React from 'react'

import store from '../store'


export default class StackOption extends React.PureComponent {

  state = {}

  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    this.subscription = store.subscribe(({ autoStack }) => {
      this.setState({ autoStack })
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  render() {
    return (
      <div>
        <input
          type="checkbox"
          checked={this.state.autoStack}
          onChange={this.handleChange}
        />
        Auto Stack
      </div>
    )
  }

  handleChange() {
    store.setState({ autoStack: !this.state.autoStack })
  }
}