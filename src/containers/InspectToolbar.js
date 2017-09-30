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
  keyCodesSelector,
  singleStep,
  startProgram,
  stopProgram,
  resetIP,
  setDelayed,
  clearDelayed,
  runningSelector,
  delayedSelector
} from '../processor/reducer'

class InspectToolbar extends React.PureComponent {

  static propTypes = {
    programText: PropTypes.string.isRequired,
    keyCodes: PropTypes.array.isRequired,
    running: PropTypes.bool.isRequired,
    loadProgram: PropTypes.func.isRequired,
    singleStep: PropTypes.func.isRequired,
    startProgram: PropTypes.func.isRequired,
    stopProgram: PropTypes.func.isRequired,
    resetIP: PropTypes.func.isRequired,
    delayed: PropTypes.bool.isRequired,
    setDelayed: PropTypes.func.isRequired,
    clearDelayed: PropTypes.func.isRequired,
    isMarkdown: PropTypes.bool.isRequired,
  }

  constructor() {
    super()
    this.toggleDelayed = this.toggleDelayed.bind(this)
    this.runStop = this.runStop.bind(this)
  }

  componentWillMount() {
    const { programText, loadProgram, isMarkdown } = this.props
    const { keyCodes, error } = compile(programText, isMarkdown ? 'markdown' : 'text')
    if (error) {
      console.log(error.message)
    } else {
      loadProgram(keyCodes)
    }
  }

  toggleDelayed() {
    if (this.props.delayed) {
      this.props.clearDelayed()
    } else {
      this.props.setDelayed()
    }
  }

  runStop() {
    const { running, startProgram, stopProgram } = this.props
    if (running) {
      stopProgram()
    } else {
      startProgram()
    }
  }

  render() {
    const { keyCodes, running, singleStep, resetIP, delayed } = this.props
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} style={{ paddingLeft: 8 }}>
          <Toggle
            label="Slow"
            labelPosition="right"
            toggled={delayed}
            onToggle={this.toggleDelayed}
          />

        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <IconButton onClick={() => resetIP()} disabled={keyCodes.length === 0 || running} >
            <Refresh color={grey700} />
          </IconButton>
          <IconButton onClick={() => singleStep()} disabled={keyCodes.length === 0 || running} >
            <Redo color={grey700} />
          </IconButton>
          <RunStopButton onClick={this.runStop} disabled={keyCodes.length === 0} running={running} />
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
    setDelayed,
    clearDelayed
  }, dispatch)

const mapStateToProps = state => ({
  running: runningSelector(state),
  delayed: delayedSelector(state),
  keyCodes: keyCodesSelector(state),
  programText: programTextSelector(state),
  isMarkdown: isMarkdownSelector(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(InspectToolbar)