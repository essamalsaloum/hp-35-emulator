import React from 'react'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import RunStopButton from '../components/RunStopButton'
import SingleStepButton from '../components/SingleStepButton'
import store from '../store'
import * as processor from '../processor'

export default class InspectToolbar extends React.PureComponent {

  state = {}
  singleStepIterator = null

  constructor() {
    super()
    this.updateProgramState = store.setSubState('program')
    this.singleStep = this.singleStep.bind(this)
  }

  componentWillMount() {
    this.subscription = store.subscribe(state => {
      const { keyCodes } = state.program
      this.setState({ keyCodes })
    })
    this.compile()
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  compile() {
    const { program } = store.getState()
    const { keyCodes, error } = processor.compile(program.text)
    if (!error) {
      this.updateProgramState({
        keyCodes,
        nextIndex: 0,
        running: false
      })
    }
  }

  singleStep() {
    this.updateProgramState({ running: true })
    processor.singleStep()
  }

  render() {
    const { keyCodes } = this.state
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <RunStopButton onClick={() => processor.runToCompletion(50)} disabled={keyCodes.length === 0} />
          <SingleStepButton onClick={this.singleStep} disabled={keyCodes.length === 0} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
