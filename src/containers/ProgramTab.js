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

  constructor(props) {
    super(props)
    this.onTextChange = this.onTextChange.bind(this)
    this.onTextUpdate = this.onTextUpdate.bind(this)
  }

  componentWillMount() {
    this.subscriptions.push(store.subscribe(({ program }) => {
      this.setState(program)
    }))
    this.subscriptions.push(processor.subscribe(keyCode => {
      const { program } = store.getState()
      if (program.recording && keyCode !== C.CLR) {
        const text = program.text + keyCode + '\n'
        store.setState({ program: { ...program, text } })
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
    store.setState({
      program: {
        ...this.state,
        text,
        keyCodes: [],
        running: false
      }

    })
  }

  resetState() {
    store.setState({ program: { ...resetState } })
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
