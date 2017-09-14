import React from 'react'
import store from '../store'
import * as processor from '../processor'
import './ProgramPanel.css'

export default class ProgramPanel extends React.PureComponent {
  state = {
    text: ''
  }

  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.runStop = this.runStop.bind(this)
  }

  componentWillMount() {
    this.subscription = store.subscribe(({ program }) => {
      this.setState({ program })
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  runStop() {
    const { running } = store.getState()
    if (running) {
      return store.setState({ running: false })
    }

    const { keyCodes, text, error } = processor.compile(this.state.text)
    this.setState({ text })
    if (error) {
      return console.log(error)
    }

    store.setState({ running: true })
    processor.runProg(keyCodes)
      .then(() => {
        store.setState({ running: false })
      })
  }

  handleChange(event) {
    const text = event.target.value
    this.setState({ text })
  }

  render() {
    return (
      <div className="ProgramPanel">
        <textarea
          autoCapitalize="none"
          autoComplete="off"
          placeholder="Enter your program here"
          spellCheck="false"
          value={this.state.text}
          onChange={this.handleChange}
        />
        <div className="ProgramPanel__buttons">
          <button className="btn" onClick={this.runStop}>R/S</button>
        </div>
      </div>
    )
  }
}