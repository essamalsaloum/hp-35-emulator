import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadProgram } from '../actions/currentProgram'
import { getKeyCodes, getProgramText } from '../reducers/currentProgram'
import { getRunning } from '../reducers/processor'
import { singleStep, runToCompletion, stopProgram, setIP } from '../actions/processor'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import Toggle from 'material-ui/Toggle'
import { grey700 } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Redo from 'material-ui/svg-icons/content/redo'
import RunStopButton from '../components/RunStopButton'
import processor from '../processor'

const DELAY = 500

class InspectToolbar extends React.PureComponent {

  static propTypes = {
    programText: PropTypes.string.isRequired,
    keyCodes: PropTypes.array.isRequired,
    running: PropTypes.bool.isRequired,
    loadProgram: PropTypes.func.isRequired,
    singleStep: PropTypes.func.isRequired,
    runToCompletion: PropTypes.func.isRequired,
    stopProgram: PropTypes.func.isRequired,
    setIP: PropTypes.func.isRequired,
  }

  state = {
    delayed: false
  }

  constructor() {
    super()
    this.toggleDelayed = this.toggleDelayed.bind(this)
    this.runStop = this.runStop.bind(this)
  }

  componentWillMount() {
    const { programText, loadProgram } = this.props
    const { keyCodes, error } = processor.compileProgram(programText)
    if (!error) {
      loadProgram(keyCodes)
    }
  }

  toggleDelayed() {
    this.setState({ delayed: !this.state.delayed })
  }

  runStop() {
    const { delayed } = this.state
    const { running, runToCompletion, stopProgram } = this.props
    if (running) {
      stopProgram()
    } else {
      runToCompletion(delayed ? DELAY : 0)
    }
  }

  render() {
    const { delayed } = this.state
    const { keyCodes, running, singleStep, setIP } = this.props
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} style={{ paddingLeft: 8 }}>
          <Toggle
            label="Slow"
            labelPosition="right"
            disabled={running}
            toggled={delayed}
            onToggle={this.toggleDelayed}
          />

        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <IconButton onClick={() => setIP(0)} disabled={keyCodes.length === 0 || running} >
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
    runToCompletion,
    stopProgram,
    setIP,
  }, dispatch)

const mapStateToProps = state => ({
  running: getRunning(state),
  keyCodes: getKeyCodes(state),
  programText: getProgramText(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(InspectToolbar)