import React from 'react'
import ProgramToolbar from './ProgramToolbar'
import store from '../store'
import C from '../processor/keyCodes'
import processor from '../processor'
import './ProgramTab.css'

const resetState = {
  text: '',
  keyCodes: [],
  ip: 0,
  error: false,
  running: false,
  recording: false
}

export default class ProgramTab extends React.PureComponent {

  state = {}
  subscriptions = []
  updateProgramState = store.setSubState('program')

  constructor() {
    super()
    this.onTextChange = this.onTextChange.bind(this)
    this.onTextUpdate = this.onTextUpdate.bind(this)
  }

  componentWillMount() {
    this.subscriptions.push(store.subscribe(state => {
      const { text, recording } = state.program
      this.setState({ text, recording })
    }))
    this.subscriptions.push(processor.subscribe(keyCode => {
      const { program } = store.getState()
      if (program.recording && keyCode !== C.CLR) {
        const text = program.text + keyCode + '\n'
        this.updateProgramState({ text })
      }
    }))
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.remove())
  }

  onTextChange(event) {
    this.onTextUpdate(event.target.value)
  }

  onTextUpdate(text) {
    this.updateProgramState({ text })
  }

  resetState() {
    this.updateProgramState({ ...resetState })
  }

  render() {
    return (
      <div className="ProgramTab">
        <textarea
          className="ProgramTab--textarea"
          autoCapitalize="none"
          autoComplete="off"
          placeholder={this.state.recording ? '' : 'Enter your program here'}
          spellCheck="false"
          value={this.state.text}
          onChange={this.onTextChange}
        />
        <ProgramToolbar initialState={{ ...resetState }} />
      </div>
    )
  }
}
