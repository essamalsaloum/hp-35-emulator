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
    this.singleStep = this.singleStep.bind(this)
    this.runToCompletion = this.runToCompletion.bind(this)
  }

  componentWillMount() {
    this.subscription = store.subscribe(({ program }) => {
      this.setState(program)
    })
    this.compile()
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  compile() {
    const {program} = store.getState()
    const { keyCodes, error } = processor.compile(program.text)
    if (!error) {
      store.setState({
        program: {
          ...program,
          keyCodes,
          nextIndex: 0
        }
      })
    }
  }

  singleStep() {
    if (this.singleStepIterator === null) {
      this.singleStepIterator = processor.createSingleStepIterator(this.state.keyCodes)
      store.setState({ program: { ...this.state, running: true } })
    }

    const { done } = this.singleStepIterator.next()

    if (done) {
      this.singleStepIterator = null
      store.setState({
        program: {
          ...this.state,
          nextIndex: 0,
          running: false
        }
      })
    }

    return done
  }

  runToCompletion() {
    let done = this.singleStep()
    while (!done) {
      done = this.singleStep()
    }
  }

  render() {
    const { keyCodes } = this.state
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <RunStopButton onClick={this.runToCompletion} disabled={keyCodes.length === 0} />
          <SingleStepButton onClick={this.singleStep} disabled={keyCodes.length === 0} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
