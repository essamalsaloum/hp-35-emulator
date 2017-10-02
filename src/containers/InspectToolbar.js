import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import Toggle from 'material-ui/Toggle'
import { grey700 } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Redo from 'material-ui/svg-icons/content/redo'
import RunStopButton from '../components/RunStopButton'
import {compile} from '../processor/compiler'
import { programTextSelector, isMarkdownSelector } from '../ducks/program'
import {
  loadProgram,
  instructionsSelector,
  singleStep,
  startProgram,
  stopProgram,
  resetIP,
  setDelayedFlag,
  clearDelayedFlag,
  runFlagSelector,
  delayedFlagSelector
} from '../processor/reducer'

class InspectToolbar extends React.PureComponent {

  static propTypes = {
    programText: PropTypes.string.isRequired,
    instructions: PropTypes.array.isRequired,
    runFlag: PropTypes.bool.isRequired,
    loadProgram: PropTypes.func.isRequired,
    singleStep: PropTypes.func.isRequired,
    startProgram: PropTypes.func.isRequired,
    stopProgram: PropTypes.func.isRequired,
    resetIP: PropTypes.func.isRequired,
    delayedFlag: PropTypes.bool.isRequired,
    setDelayedFlag: PropTypes.func.isRequired,
    clearDelayedFlag: PropTypes.func.isRequired,
    isMarkdown: PropTypes.bool.isRequired,
  }

  constructor() {
    super()
    this.toggleDelayed = this.toggleDelayed.bind(this)
    this.runStop = this.runStop.bind(this)
  }

  componentWillMount() {
    const { programText, loadProgram, isMarkdown } = this.props
    const { instructions, error } = compile(programText, isMarkdown ? 'markdown' : 'text')
    if (error) {
      console.log(error.message)
    } else {
      loadProgram(instructions)
    }
  }

  toggleDelayed() {
    if (this.props.delayedFlag) {
      this.props.clearDelayedFlag()
    } else {
      this.props.setDelayedFlag()
    }
  }

  runStop() {
    const { runFlag, startProgram, stopProgram } = this.props
    if (runFlag) {
      stopProgram()
    } else {
      startProgram()
    }
  }

  render() {
    const { instructions, runFlag, singleStep, resetIP, delayedFlag } = this.props
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} style={{ paddingLeft: 8 }}>
          <Toggle
            label="Slow"
            labelPosition="right"
            toggled={delayedFlag}
            onToggle={this.toggleDelayed}
          />

        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <IconButton onClick={() => resetIP()} disabled={instructions.length === 0 || runFlag} >
            <Refresh color={grey700} />
          </IconButton>
          <IconButton onClick={() => singleStep()} disabled={instructions.length === 0 || runFlag} >
            <Redo color={grey700} />
          </IconButton>
          <RunStopButton onClick={this.runStop} disabled={instructions.length === 0} runFlag={runFlag} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    loadProgram,
    singleStep,
    startProgram,
    stopProgram,
    resetIP,
    setDelayedFlag,
    clearDelayedFlag
  }, dispatch)

const mapStateToProps = state => ({
  runFlag: runFlagSelector(state),
  delayedFlag: delayedFlagSelector(state),
  instructions: instructionsSelector(state),
  programText: programTextSelector(state),
  isMarkdown: isMarkdownSelector(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(InspectToolbar)