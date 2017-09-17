import React from 'react'
import store from '../store'
import C from '../processor/keyCodes'
import * as processor from '../processor'
import './ProgramPanel.css'

const DELAY_MS = 1000

export default class ProgramPanel extends React.PureComponent {
  state = {
    text: ''
  }

  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.runStop = this.runStop.bind(this)
    this.clear = this.clear.bind(this)
    this.toggleRecording = this.toggleRecording.bind(this)
    this.toggleDelay = this.toggleDelay.bind(this)
  }

  componentWillMount() {
    this.storeSubscription = store.subscribe(({ recording, program, delay }) => {
      this.setState({ recording, program, delay })
    })
    this.processorSubscription = processor.subscribe(keyCode => {
      if (this.state.recording && keyCode !== C.CLR) {
        this.setState(prevState => ({ text: prevState.text + keyCode + '\n' }))
      }
    })
  }

  componentWillUnmount() {
    this.storeSubscription.remove()
    this.processorSubscription.remove()
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

    store.setState({ running: true, recording: false, keyModifier: null })
    processor.runProg(keyCodes)
      .then(() => {
        store.setState({ running: false })
      })
  }

  clear() {
    this.setState({text: ''})
  }

  handleChange(event) {
    const text = event.target.value
    this.setState({ text})
    store.setState({running: false, keyModifier: null })
  }

  toggleDelay() {
    const delay = this.state.delay === 0 ? DELAY_MS : 0
    store.setState({ delay, running: false })
  }

  toggleRecording() {
    const recording = !this.state.recording
    if (recording) {
      this.setState({ text: '' })
    }
    store.setState({ recording })
  }

  render() {
    return (
      <div className="ProgramPanel">
        <textarea
          autoCapitalize="none"
          autoComplete="off"
          placeholder={this.state.recording ? '' : 'Enter your program here'}
          spellCheck="false"
          value={this.state.text}
          onChange={this.handleChange}
        />
        <div className="ProgramPanel--buttons">
          <div>
            <input
              type="checkbox"
              checked={this.state.delay !== 0}
              onChange={this.toggleDelay}
            />
            <span style={{ fontSize: 12 }}>Slow</span>
            <input
              type="checkbox"
              checked={this.state.recording}
              onChange={this.toggleRecording}
            />
            <span style={{ fontSize: 12 }}>Recording</span>
          </div>
          <div style={{flex: 1}}></div>
          <button className="btn" style={{marginRight: 4}} onClick={this.clear}>Clear</button>
          <button className="btn" onClick={this.runStop}>R/S</button>
        </div>
      </div>
    )
  }
}