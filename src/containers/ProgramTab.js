import React from 'react'
import ProgramToolbar from './ProgramToolbar'
import store from '../store'
import C from '../processor/keyCodes'
import processor from '../processor'

const resetState = {
  text: '',
  keyCodes: [],
  ip: 0,
  error: false,
  running: false,
  recording: false
}

const styles = {
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  textarea: {
    padding: 8,
    borderStyle: 'none',
    backgroundColor: '#fafafa',
    resize: 'none',
    fontFamily: `'Roboto', sans-serif`,
    fontSize: 14,
    flex: 1
  }
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
      <div style={styles.root}>
        <textarea
          autoCapitalize="none"
          autoComplete="off"
          placeholder={this.state.recording ? '' : 'Enter your program here'}
          spellCheck="false"
          value={this.state.text}
          onChange={this.onTextChange}
          style={styles.textarea}
        />
        <ProgramToolbar initialState={{ ...resetState }} />
      </div>
    )
  }
}
