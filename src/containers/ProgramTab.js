import React from 'react'
import ProgramToolbar from './ProgramToolbar'
import store from '../store'
import C from '../processor/keyCodes'
import * as processor from '../processor'

import './ProgramTab.css'


const resetState = {
  text: '',
  keyCodes: [],
  nextIndex: 0,
  error: false,
  running: false,
  recording: false
}

export default class ProgramTab extends React.PureComponent {

  state = {}
  subscriptions = []

  constructor() {
    super()
    this.onTextChange = this.onTextChange.bind(this)
    this.onTextUpdate = this.onTextUpdate.bind(this)
    this.storeProgramState = store.setSubState('program')
  }

  componentWillMount() {
    this.subscriptions.push(store.subscribe(({ program }) => {
      this.setState(program)
    }))
    this.subscriptions.push(processor.subscribe(keyCode => {
      const { program } = store.getState()
      if (program.recording && keyCode !== C.CLR) {
        const text = program.text + keyCode + '\n'
        this.storeProgramState({ ...program, text })
      }
    }))
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.remove())
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { text, recording} = this.state
    return nextState.text !== text || nextState.recording !== recording
  }

  onTextChange(event) {
    this.onTextUpdate(event.target.value)
  }

  onTextUpdate(text) {
    this.storeProgramState({
      ...this.state,
      text,
      keyCodes: [],
      running: false
    })
  }

  resetState() {
    this.storeProgramState({ ...resetState })
  }

  render() {
    return (
      <div className="ProgramTab">
        <textarea
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
