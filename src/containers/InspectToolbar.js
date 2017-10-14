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
import Compiler from '../cpu/compiler'
import { resetKeypad } from '../ducks/ui'
import { programTextSelector, isMarkdownSelector } from '../ducks/program'
import {
  loadKeyCodes,
  clearKeyCodes,
  keyCodesSelector,
  singleStep,
  startProgram,
  stopProgram,
  gotoProgramTop,
  setDelayed,
  clearDelayed,
  isRunningSelector,
  isDelayedSelector
} from '../cpu/reducer'

class InspectToolbar extends React.PureComponent {

  static propTypes = {
    programText: PropTypes.string.isRequired,
    keyCodes: PropTypes.array.isRequired,
    clearKeyCodes: PropTypes.func.isRequired,
    isRunning: PropTypes.bool.isRequired,
    loadKeyCodes: PropTypes.func.isRequired,
    singleStep: PropTypes.func.isRequired,
    startProgram: PropTypes.func.isRequired,
    stopProgram: PropTypes.func.isRequired,
    gotoProgramTop: PropTypes.func.isRequired,
    isDelayed: PropTypes.bool.isRequired,
    setDelayed: PropTypes.func.isRequired,
    clearDelayed: PropTypes.func.isRequired,
    isMarkdown: PropTypes.bool.isRequired,
    resetKeypad: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.toggleDelayed = this.toggleDelayed.bind(this)
    this.runStop = this.runStop.bind(this)
    this.singleStep = this.singleStep.bind(this)
  }

  componentWillMount() {
    const { programText, loadKeyCodes, clearKeyCodes, isMarkdown } = this.props
    clearKeyCodes()
    const compiler = new Compiler()
    compiler.compile(programText, isMarkdown ? 'markdown' : 'text')
      .then(keyCodes => loadKeyCodes(keyCodes))
      .catch(error => console.log(error.message))
  }

  toggleDelayed() {
    if (this.props.isDelayed) {
      this.props.clearDelayed()
    } else {
      this.props.setDelayed()
    }
  }

  runStop() {
    const { isRunning, startProgram, stopProgram, resetKeypad } = this.props
    if (isRunning) {
      stopProgram()
    } else {
      resetKeypad()
      startProgram()
    }
  }

  singleStep() {
    this.props.resetKeypad()
    this.props.singleStep()
  }

  render() {
    const { keyCodes, isRunning, gotoProgramTop, isDelayed } = this.props
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} style={{ paddingLeft: 8 }}>
          <Toggle
            label="Slow"
            labelPosition="right"
            toggled={isDelayed}
            onToggle={this.toggleDelayed}
          />

        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <IconButton onClick={() => gotoProgramTop()} disabled={keyCodes.length === 0 || isRunning} >
            <Refresh color={grey700} />
          </IconButton>
          <IconButton onClick={this.singleStep} disabled={keyCodes.length === 0 || isRunning} >
            <Redo color={grey700} />
          </IconButton>
          <RunStopButton onClick={this.runStop} disabled={keyCodes.length === 0} isRunning={isRunning} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    loadKeyCodes,
    clearKeyCodes,
    singleStep,
    startProgram,
    stopProgram,
    gotoProgramTop,
    setDelayed,
    clearDelayed,
    resetKeypad,
  }, dispatch)

const mapStateToProps = state => ({
  isRunning: isRunningSelector(state),
  isDelayed: isDelayedSelector(state),
  keyCodes: keyCodesSelector(state),
  programText: programTextSelector(state),
  isMarkdown: isMarkdownSelector(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(InspectToolbar)