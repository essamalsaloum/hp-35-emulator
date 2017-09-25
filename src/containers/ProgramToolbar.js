import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import Toggle from 'material-ui/Toggle'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import Delete from 'material-ui/svg-icons/action/delete'
import { grey700 } from 'material-ui/styles/colors'

import RunStopButton from '../components/RunStopButton'
import * as gitHub from '../cloud/gitHub'
import store from '../store'
import processor from '../processor'

const updateProgramState = store.setSubState('program')
const updateTabProgramState = store.setSubState('programTab')

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
    this.loadGitHubTitles = this.loadGitHubTitles.bind(this)
  }

  componentWillMount() {
    this.subscription = store.subscribe(state => {
      const { text, running, recording } = state.program
      this.setState({ text, running, recording })
    })
    updateProgramState({ running: false, ip: 0 })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  toggleRecording(ev, isInputChecked) {
    const recording = isInputChecked
    if (recording) {
      updateProgramState({
        recording: true,
        text: '',
        keyCodes: []
      })
    } else {
      updateProgramState({
        recording: false
      })
    }
  }

  runStop() {
    if (this.state.running) {
      updateProgramState({
        running: false
      })
      return
    }

    const { text, keyCodes, error } = processor.compileProgram(this.state.text)

    if (error) {
      updateProgramState({ ...this.props.initialState, text })
    } else {
      updateProgramState({
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
    updateProgramState({
      text: '',
      keyCodes: [],
      ip: 0,
      running: false,
      error: false
    })
  }

  loadGitHubTitles() {
    gitHub.loadProgramList()
      .then(data => console.log(data))
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
          <IconButton onClick={() => updateTabProgramState({ mode: 'gitHub' })} disabled={running}>
            <FontIcon className="fa fa-github" color={grey700}/>
          </IconButton>
          <IconButton onClick={this.clearProgram} disabled={this.noText || running} >
            <Delete color={grey700} />
          </IconButton>
          <RunStopButton onClick={this.runStop} disabled={this.noText} running={running} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
