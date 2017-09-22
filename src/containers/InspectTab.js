import React from 'react'
import InspectToolbar from './InspectToolbar'
import store from '../store'
import './InspectTab.css'

export default class InspectTab extends React.PureComponent {

  state = {}

  constructor(props) {
    super(props)
    this.renderKeyCode = this.renderKeyCode.bind(this)
  }

  componentWillMount() {
    this.subscription = store.subscribe(state => {
      const { keyCodes, ip } = state.program
      this.setState({ keyCodes, ip })
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  renderKeyCode(keyCode, id) {
    const className = id === this.state.ip
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
          {this.state.keyCodes.map(this.renderKeyCode)}
        </div>
        <InspectToolbar />
      </div>
    )
  }
}

