import React from 'react'
import store from '../store'
import theme from '../theme'
import './Display.css'

const labels = ['x', 'y', 'z', 't']
const annunciators = ['', 'f', 'g']

const annunciatorStyles = [
  { color: '#689F38'},
  { color: theme.topLabelColor },
  { color: theme.bottomLabelColor }
]

export default class Display extends React.PureComponent {

  state = {}

  componentWillMount() {
    this.subscription = store.subscribe(({ stack, buffer, shiftIndex, running }) => {
      this.setState({ stack, buffer, shiftIndex, running })
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  renderStack(stack, buffer) {
    return stack.map((register, index) => {
      const value = index === 0 ? buffer : register.toString()
      return (
        <div className="Display--row" key={index}>{`${labels[index]}: ${value}`}</div>
      )
    }).reverse()
  }

  render() {
    const { stack, buffer, shiftIndex, running} = this.state
    const annunciatorText = running ? 'running...' : annunciators[shiftIndex]
    return (
      <div className="Display">
        <div className="Display--annunciator" style={annunciatorStyles[shiftIndex]}>{annunciatorText}</div>
        {this.renderStack(stack, buffer)}
      </div>
    )
  }
}
