import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import Toggle from 'material-ui/Toggle'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import Delete from 'material-ui/svg-icons/action/delete'
import RunStopButton from '../components/RunStopButton'
import { grey700 } from 'material-ui/styles/colors'
import { selectGitHubTab } from '../ducks/programPanel'
import { clearProgram, programTextSelector, isMarkdownSelector, setRecording, recordingSelector } from '../ducks/program'
import { loadProgram, startProgram, stopProgram, runningSelector } from '../processor/reducer'

import compileProgram from '../processor/compiler'


class ProgramToolbar extends React.PureComponent {

  static propTypes = {
    initialState: PropTypes.object.isRequired,
    selectGitHubTab: PropTypes.func.isRequired,
    running: PropTypes.bool.isRequired,
    programText: PropTypes.string,
    loadProgram: PropTypes.func,
    clearProgram: PropTypes.func,
    startProgram: PropTypes.func,
    stopProgram: PropTypes.func,
    isMarkdown: PropTypes.bool.isRequired,
    setRecording: PropTypes.func.isRequired,
    recording: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
    this.toggleRecording = this.toggleRecording.bind(this)
    this.runStop = this.runStop.bind(this)
  }

  isEmptyProgram() {
    return this.props.programText.trim() === ''
  }

  toggleRecording(ev, isInputChecked) {
    const recording = isInputChecked
    if (recording) {
      this.props.clearProgram()
    }
    this.props.setRecording(recording)
  }

  runStop() {
    const { loadProgram, running, startProgram, stopProgram, setRecording, recording } = this.props
    if (recording) {
      setRecording(false)
    }
    if (running) {
      stopProgram()
    } else {
      const { keyCodes, error } = compileProgram(this.props.programText)
      if (error) {
        console.log(error.message)
      } else {
        loadProgram(keyCodes)
        startProgram()
      }
    }
  }

  // to avoid a console warning
  renderToggle() {
    const { running, isMarkdown, recording } = this.props
    if (running || isMarkdown) {
      return null
    } else {
      return (<Toggle
        label="Record"
        labelPosition="right"
        disabled={running || isMarkdown}
        toggled={recording}
        onToggle={this.toggleRecording}
      />)
    }
  }

  render() {
    const { running } = this.props
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} style={{ paddingLeft: 8 }}>
          {this.renderToggle()}
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <IconButton onClick={() => this.props.selectGitHubTab()} disabled={running}>
            <FontIcon className="fa fa-github" color={grey700} />
          </IconButton>
          <IconButton onClick={this.props.clearProgram} disabled={this.isEmptyProgram() || running} >
            <Delete color={grey700} />
          </IconButton>
          <RunStopButton onClick={this.runStop} disabled={this.isEmptyProgram()} running={running} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    selectGitHubTab,
    loadProgram,
    clearProgram,
    startProgram,
    stopProgram,
    setRecording,
  }, dispatch)

const mapStateToProps = state => ({
  running: runningSelector(state),
  programText: programTextSelector(state),
  isMarkdown: isMarkdownSelector(state),
  recording: recordingSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProgramToolbar)