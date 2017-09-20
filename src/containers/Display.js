import React from 'react'
import math from 'mathjs'
import store from '../store'
import theme from '../theme'
import C from '../processor/keyCodes'
import './Display.css'

const labels = ['x', 'y', 'z', 't']
const annunciators = {
  [C.SHIFT_UP]: 'f',
  [C.SHIFT_DOWN]: 'g'
}

const annunciatorStyles = [
  { color: '#689F38' },
  { color: theme.shiftUpColor },
  { color: theme.shiftDownColor }
]

export default class Display extends React.PureComponent {

  state = {}

  componentWillMount() {
    this.subscription = store.subscribe(({ processor, keypad, program }) => {
      this.setState({ processor, keypad, program })
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  renderStack(stack, buffer) {
    return stack.map((register, index) => {
      const value = index === 0 ? buffer : math.format(register, { precision: 14 })
      return (
        <div className="Display--row" key={index} style={index > 0 ? { color: '#808080' } : {}}>{`${labels[index]}: ${value}`}</div>
      )
    }).reverse()
  }

  render() {
    const { processor, keypad, program } = this.state
    const annunciatorText = program.running ? 'running...' : keypad.shiftKey ? annunciators[keypad.shiftKey] : ''
    return (
      <div className="Display">
        <div className="Display--annunciator" style={annunciatorStyles[keypad.shiftKey]}>{annunciatorText}</div>
        {this.renderStack(processor.stack, processor.buffer)}
      </div>
    )
  }
}
