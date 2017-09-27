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
import { selectGitHubTab } from '../actions/programPanel'
import { runningSelector } from '../reducers/processor'
import { loadProgram, clearProgram } from '../actions/currentProgram'
import { programTextSelector, fromGitHubSelector } from '../reducers/currentProgram'
import { runToCompletion, stopProgram } from '../actions/processor'

import RunStopButton from '../components/RunStopButton'
import processor from '../processor'

class ProgramToolbar extends React.PureComponent {

  static propTypes = {
    initialState: PropTypes.object.isRequired,
    selectGitHubTab: PropTypes.func.isRequired,
    running: PropTypes.bool.isRequired,
    programText: PropTypes.string,
    loadProgram: PropTypes.func,
    clearProgram: PropTypes.func,
    runToCompletion: PropTypes.func,
    stopProgram: PropTypes.func,
    fromGitHub: PropTypes.bool.isRequired,
  }

  state = {
    recording: false
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
    this.setState({ recording })
  }

  runStop() {
    const { loadProgram, running, runToCompletion, stopProgram } = this.props
    if (running) {
      stopProgram()
    } else {
      const { keyCodes, error } = processor.compileProgram(this.props.programText)
      if (error) {
        console.log('there as an error')
      } else {
        loadProgram(keyCodes)
        runToCompletion()
      }
    }
  }

  // to avoid a console warning
  renderToggle() {
    const { recording } = this.state
    const { running, fromGitHub } = this.props
    if (running || fromGitHub) {
      return null
    } else {
      return (<Toggle
        label="Record"
        labelPosition="right"
        disabled={running || fromGitHub}
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
    runToCompletion,
    stopProgram,
  }, dispatch)

const mapStateToProps = state => ({
  running: runningSelector(state),
  programText: programTextSelector(state),
  fromGitHub: fromGitHubSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProgramToolbar)