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
import { showGitHubPanel, resetKeypad } from '../ducks/ui'
import { clearProgram, refreshProgramText, programTextSelector, isMarkdownSelector, setRecording, clearRecording, isRecordingSelector } from '../ducks/program'
import { loadKeyCodes, clearKeyCodes, startProgram, stopProgram, isRunningSelector, clearDelayed } from '../cpu/reducer'
import Compiler from '../cpu/compiler'
import { setLoading, clearLoading } from '../ducks/library'

class ProgramToolbar extends React.PureComponent {

  static propTypes = {
    initialState: PropTypes.object.isRequired,
    setError: PropTypes.func.isRequired,
    showGitHubPanel: PropTypes.func.isRequired,
    isRunning: PropTypes.bool.isRequired,
    programText: PropTypes.string,
    loadKeyCodes: PropTypes.func,
    clearKeyCodes: PropTypes.func,
    clearProgram: PropTypes.func,
    refreshProgramText: PropTypes.func,
    startProgram: PropTypes.func,
    stopProgram: PropTypes.func,
    isMarkdown: PropTypes.bool.isRequired,
    setRecording: PropTypes.func.isRequired,
    clearRecording: PropTypes.func.isRequired,
    recording: PropTypes.bool.isRequired,
    clearDelayed: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    clearLoading: PropTypes.func.isRequired,
    resetKeypad: PropTypes.func.isRequired,
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
      this.props.setRecording()
    } else {
      this.props.clearRecording()
    }
  }

  runStop() {
    const {
      programText,
      loadKeyCodes,
      clearKeyCodes,
      isRunning,
      startProgram,
      stopProgram,
      clearRecording,
      recording,
      isMarkdown,
      setError,
      clearDelayed,
      setLoading,
      clearLoading,
      resetKeypad,
    } = this.props
    if (recording) {
      clearRecording()
    }
    if (isRunning) {
      stopProgram()
    } else {
      resetKeypad()
      clearKeyCodes()
      clearDelayed()
      setLoading()
      const compiler = new Compiler()
      compiler.compile(programText, isMarkdown ? 'markdown' : 'text')
        .then(keyCodes => {
          setError(null)
          clearLoading()
          loadKeyCodes(keyCodes)
          startProgram()
        })
        .catch(error => {
          clearLoading()
          setError(error)
        })
    }
  }

  // to avoid a console warning
  renderToggle() {
    const { isRunning, isMarkdown, recording } = this.props
    if (isRunning || isMarkdown) {
      return null
    } else {
      return (<Toggle
        label="Record"
        labelPosition="right"
        disabled={isRunning || isMarkdown}
        toggled={recording}
        onToggle={this.toggleRecording}
      />)
    }
  }

  renderEditButton() {
    const { isMarkdown, isRunning } = this.props
    if (!isMarkdown) {
      return null
    } else {
      return (
        <IconButton onClick={this.extractProgram} disabled={isRunning}>
          <FontIcon className="fa fa-pencil" color={grey700} />
        </IconButton>
      )
    }
  }

  extractProgram() {
    const { programText, refreshProgramText } = this.props
    const text = Compiler.extractProgramText(programText)
    refreshProgramText(text)
  }

  render() {
    const { isRunning, clearProgram, showGitHubPanel } = this.props
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} style={{ paddingLeft: 8 }}>
          {this.renderToggle()}
          {this.renderEditButton()}
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <IconButton onClick={() => showGitHubPanel()} disabled={isRunning}>
            <FontIcon className="fa fa-github" color={grey700} />
          </IconButton>
          <IconButton onClick={clearProgram} disabled={this.isEmptyProgram() || isRunning} >
            <Delete color={grey700} />
          </IconButton>
          <RunStopButton onClick={this.runStop} disabled={this.isEmptyProgram()} isRunning={isRunning} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    showGitHubPanel,
    loadKeyCodes,
    clearKeyCodes,
    clearProgram,
    refreshProgramText,
    startProgram,
    stopProgram,
    setRecording,
    clearRecording,
    clearDelayed,
    setLoading,
    clearLoading,
    resetKeypad,
  }, dispatch)

const mapStateToProps = state => ({
  isRunning: isRunningSelector(state),
  programText: programTextSelector(state),
  isMarkdown: isMarkdownSelector(state),
  recording: isRecordingSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProgramToolbar)