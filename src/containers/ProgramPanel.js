import React from 'react'
import store from '../store'
import C from '../processor/keyCodes'
import * as processor from '../processor'
import './ProgramPanel.css'

export default class ProgramPanel extends React.PureComponent {
  state = {
    text: ''
  }

  singleStepIterator = null

  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.runStop = this.runStop.bind(this)
    this.clear = this.clear.bind(this)
    this.singleStep = this.singleStep.bind(this)
    this.toggleRecording = this.toggleRecording.bind(this)
  }

  componentWillMount() {
    this.storeSubscription = store.subscribe(({ recording, program }) => {
      this.setState({ recording, program })
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

    store.setState({ running: true, recording: false, shiftKey: null })
    processor.runProg(keyCodes)
      .then(() => {
        store.setState({ running: false })
      })
  }

  singleStep() {
    if (this.singleStepIterator === null) {
      const { keyCodes, text, error } = processor.compile(this.state.text)
      this.setState({ text })
      if (error) {
        return console.log(error)
      }
      store.setState({ running: true, recording: false, shiftKey: null })
      this.singleStepIterator = processor.createSingleStepIterator(keyCodes)
    }

    const { done } = this.singleStepIterator.next()
    if (done) {
      this.singleStepIterator = null
      store.setState({ running: false })
    }
  }

  clear() {
    this.setState({ text: '' })
  }

  handleChange(event) {
    const text = event.target.value
    this.setState({ text })
    store.setState({ running: false, shiftKey: null })
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
              checked={this.state.recording}
              onChange={this.toggleRecording}
            />
            <span style={{ fontSize: 12 }}>Recording</span>
          </div>
          <div style={{ flex: 1 }}></div>
          <button className="btn" style={{ marginRight: 8 }} onClick={this.clear}>Clear</button>
          <button className="btn" style={{ marginRight: 8 }} onClick={this.singleStep}>SST</button>
          <button className="btn" onClick={this.runStop}>R/S</button>
        </div>
      </div>
    )
  }
}