import React from 'react'
import store from '../store'
// import Switch from 'react-toggle-switch'
import * as processor from '../processor'
import './ProgramPanel.css'

const DELAY_MS = 1000

export default class ProgramPanel extends React.PureComponent {
  state = {
    text: '',
    delay: 0
  }

  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.runStop = this.runStop.bind(this)
    this.toggleDelay = this.toggleDelay.bind(this)
  }

  componentWillMount() {
    this.subscription = store.subscribe(({ program, delay }) => {
      this.setState({ program, delay })
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

  toggleDelay() {
    const delay = this.state.delay === 0 ? DELAY_MS : 0
    store.setState({ delay })
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
          <div>
            <input
              type="checkbox"
              checked={this.state.delay !== 0}
              onChange={this.toggleDelay}
            />
            <span style={{fontSize: 12}}>Slow</span>
          </div>
          <button className="btn" onClick={this.runStop}>R/S</button>
        </div>
      </div>
    )
  }
}