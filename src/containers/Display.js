import React from 'react'
import store from '../store'
import theme from '../theme'
import C from '../processor/keyCodes'
import './Display.css'

const labels = ['x', 'y', 'z', 't']
const annunciators = {
  [C.SHIFT_TOP]: 'f',
  [C.SHIFT_BOTTOM]: 'g'
}

const annunciatorStyles = [
  { color: '#689F38'},
  { color: theme.topLabelColor },
  { color: theme.bottomLabelColor }
]

export default class Display extends React.PureComponent {

  state = {}

  componentWillMount() {
    this.subscription = store.subscribe(({ stack, buffer, keyModifier, running }) => {
      this.setState({ stack, buffer, keyModifier, running })
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  renderStack(stack, buffer) {
    return stack.map((register, index) => {
      const value = index === 0 ? buffer : register.toString()
      return (
        <div className="Display--row" key={index}  style={index > 0 ? {color: '#808080'} : {}}>{`${labels[index]}: ${value}`}</div>
      )
    }).reverse()
  }

  render() {
    const { stack, buffer, keyModifier, running} = this.state
    const annunciatorText = running ? 'running...' : keyModifier ? annunciators[keyModifier] : ''
    return (
      <div className="Display">
        <div className="Display--annunciator" style={annunciatorStyles[keyModifier]}>{annunciatorText}</div>
        {this.renderStack(stack, buffer)}
      </div>
    )
  }
}
