import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import Toggle from 'material-ui/Toggle'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import Delete from 'material-ui/svg-icons/action/delete'
import { grey700 } from 'material-ui/styles/colors'
import { selectGitHubTab } from '../ducks/programPanel'
import { loadKeyCodes, clearProgram, programTextSelector, isMarkdownSelector, setRecording, recordingSelector } from '../ducks/program'
import { runToCompletion, stopProgram, runningSelector } from '../ducks/processor'

import RunStopButton from '../components/RunStopButton'
import processor from '../processor'

class ProgramToolbar extends React.PureComponent {

  static propTypes = {
    initialState: PropTypes.object.isRequired,
    selectGitHubTab: PropTypes.func.isRequired,
    running: PropTypes.bool.isRequired,
    programText: PropTypes.string,
    loadKeyCodes: PropTypes.func,
    clearProgram: PropTypes.func,
    runToCompletion: PropTypes.func,
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
    const { loadKeyCodes, running, runToCompletion, stopProgram, setRecording, recording } = this.props
    if (recording) {
      setRecording(false)
    }
    if (running) {
      stopProgram()
    } else {
      const { keyCodes, error } = processor.compileProgram(this.props.programText)
      if (error) {
        console.log(error.message)
      } else {
        loadKeyCodes(keyCodes)
        runToCompletion()
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
    loadKeyCodes,
    clearProgram,
    runToCompletion,
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