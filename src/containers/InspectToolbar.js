import React from 'react'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import Toggle from 'material-ui/Toggle'
import { grey700 } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Redo from 'material-ui/svg-icons/content/redo'
import RunStopButton from '../components/RunStopButton'
import store from '../store'
import processor from '../processor'

const DELAY = 500

export default class InspectToolbar extends React.PureComponent {

  state = {
    delayed: false
  }

  singleStepIterator = null

  constructor() {
    super()
    this.toggleDelayed = this.toggleDelayed.bind(this)
    this.runStop = this.runStop.bind(this)
  }

  componentWillMount() {
    this.subscription = store.subscribe(state => {
      const { keyCodes, running } = state.program
      this.setState({ keyCodes, running })
    })
    this.compileProgram()
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  toggleDelayed() {
    this.setState({ delayed: !this.state.delayed })
  }

  compileProgram() {
    const { program } = store.getState()
    const { keyCodes, error } = processor.compileProgram(program.text)
    if (!error) {
      processor.loadProgram(keyCodes)
    }
  }

  runStop() {
    const { running, delayed } = this.state
    if (running) {
      processor.stopProgram()
    } else {
      processor.runToCompletion(delayed ? DELAY : 0)
    }
  }

  render() {
    const { keyCodes, running, delayed } = this.state
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} style={{ paddingLeft: 8 }}>
          <Toggle
            label="Delay"
            labelPosition="right"
            disabled={running}
            toggled={delayed}
            onToggle={this.toggleDelayed}
          />

        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <IconButton onClick={() => processor.loadProgram(keyCodes)} disabled={keyCodes.length === 0 || running} >
            <Refresh color={grey700} />
          </IconButton>
          <IconButton onClick={() => processor.singleStep()} disabled={keyCodes.length === 0 || running} >
            <Redo color={grey700} />
          </IconButton>
          <RunStopButton onClick={this.runStop} disabled={keyCodes.length === 0} running={running} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
