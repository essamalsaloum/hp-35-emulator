import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import Toggle from 'material-ui/Toggle'
import RunStopButton from '../components/RunStopButton'
import DeleteButton from '../components/DeleteButton'
import store from '../store'
import processor from '../processor'

export default class ProgramToolbar extends React.PureComponent {

  static propTypes = {
    initialState: PropTypes.object.isRequired
  }

  state = {}

  get noText() {
    return this.state.text.trim() === ''
  }

  constructor(props) {
    super(props)
    this.toggleRecording = this.toggleRecording.bind(this)
    this.runStop = this.runStop.bind(this)
    this.clearProgram = this.clearProgram.bind(this)
    this.updateProgramState = store.setSubState('program')
  }

  componentWillMount() {
    this.subscription = store.subscribe(state => {
      const { text, running, recording } = state.program
      this.setState({ text, running, recording })
    })
    this.updateProgramState({ running: false, ip: 0 })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  toggleRecording(ev, isInputChecked) {
    const recording = isInputChecked
    if (recording) {
      this.updateProgramState({
        recording: true,
        text: '',
        keyCodes: []
      })
    } else {
      this.updateProgramState({
        recording: false
      })
    }
  }

  runStop() {
    if (this.state.running) {
      this.updateProgramState({
        running: false
      })
      return
    }

    const { text, keyCodes, error } = processor.compileProgram(this.state.text)

    if (error) {
      this.updateProgramState({ ...this.props.initialState, text })
    } else {
      this.updateProgramState({
        keyCodes,
        ip: 0,
        error: false,
        running: true,
        recording: false
      })
      processor.runToCompletion()
    }
  }

  clearProgram() {
    this.updateProgramState({
      text: '',
      keyCodes: [],
      ip: 0,
      running: false,
      error: false
    })
  }

  render() {
    const { running, recording } = this.state
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} style={{ paddingLeft: 8 }}>
          <Toggle
            label="Record"
            labelPosition="right"
            disabled={running}
            toggled={recording}
            onToggle={this.toggleRecording}
          />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <DeleteButton onClick={this.clearProgram} disabled={this.noText || running} />
          <RunStopButton onClick={this.runStop} disabled={this.noText} running={running} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
