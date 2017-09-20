import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import Toggle from 'material-ui/Toggle'
import RunStopButton from '../components/RunStopButton'
import DeleteButton from '../components/DeleteButton'
import store from '../store'
import * as processor from '../processor'

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
    this.storeProgramState = store.setSubState('program')
  }

  componentWillMount() {
    this.subscription = store.subscribe(({ program }) => {
      this.setState(program)
    })
    const {program } = store.getState()
    this.storeProgramState({ ...program, running: false, nextIndex: 0 })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  toggleRecording(ev, isInputChecked) {
    const recording = isInputChecked
    if (recording) {
      this.storeProgramState({
        ...this.state,
        recording: true,
        text: '',
        keyCodes: []
      })
    } else {
      this.storeProgramState({
        ...this.state,
        recording: false
      })
    }
  }

  runStop() {
    if (this.state.running) {
      this.storeProgramState({
        ...this.state,
        running: false
      })
      return
    }

    const { text, keyCodes, error } = processor.compile(this.state.text)

    if (error) {
      this.storeProgramState({ ...this.props.initialState, text })
    } else {
      this.storeProgramState({
        ...this.state,
        keyCodes,
        nextIndex: 0,
        error: false,
        running: true,
        recording: false
      })
      processor.runToCompletion()
    }
  }

  clearProgram() {
    this.storeProgramState({
      text: '',
      keyCodes: [],
      nextIndex: 0,
      running: false,
      error: false
    })
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} style={{ paddingLeft: 8 }}>
          <Toggle
            label="Recording"
            labelPosition="right"
            disabled={this.state.running}
            toggled={this.state.recording}
            onToggle={this.toggleRecording}
          />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <DeleteButton onClick={this.clearProgram} disabled={this.noText} />
          <RunStopButton onClick={this.runStop} disabled={this.noText} running={this.state.running} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
