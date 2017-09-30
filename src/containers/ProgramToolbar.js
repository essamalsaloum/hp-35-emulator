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
import { clearProgram, setProgramText, programTextSelector, isMarkdownSelector, setRecording, recordingSelector } from '../ducks/program'
import { loadProgram, startProgram, stopProgram, runningSelector } from '../processor/reducer'
import { compile, extractProgramText } from '../processor/compiler'

class ProgramToolbar extends React.PureComponent {

  static propTypes = {
    initialState: PropTypes.object.isRequired,
    setError: PropTypes.func.isRequired,
    selectGitHubTab: PropTypes.func.isRequired,
    running: PropTypes.bool.isRequired,
    programText: PropTypes.string,
    loadProgram: PropTypes.func,
    clearProgram: PropTypes.func,
    setProgramText: PropTypes.func,
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
    this.extractProgram = this.extractProgram.bind(this)
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
    const {
      programText,
      loadProgram,
      running,
      startProgram,
      stopProgram,
      setRecording,
      recording,
      isMarkdown,
      setError
    } = this.props
    if (recording) {
      setRecording(false)
    }
    if (running) {
      stopProgram()
    } else {
      const { keyCodes, error } = compile(programText, isMarkdown ? 'markdown' : 'text')
      if (error) {
        setError(error)
      } else {
        setError(null)
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

  renderEditButton() {
    const { isMarkdown, running } = this.props
    if (!isMarkdown) {
      return null
    } else {
      return (
        <IconButton onClick={this.extractProgram} disabled={running}>
          <FontIcon className="fa fa-pencil" color={grey700} />
        </IconButton>
      )
    }
  }

  extractProgram() {
    const {programText, setProgramText} = this.props
    const text = extractProgramText(programText)
    setProgramText(text)
  }

  render() {
    const { running, clearProgram, selectGitHubTab } = this.props
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} style={{ paddingLeft: 8 }}>
          {this.renderToggle()}
          {this.renderEditButton()}
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <IconButton onClick={() => selectGitHubTab()} disabled={running}>
            <FontIcon className="fa fa-github" color={grey700} />
          </IconButton>
          <IconButton onClick={clearProgram} disabled={this.isEmptyProgram() || running} >
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
    setProgramText,
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