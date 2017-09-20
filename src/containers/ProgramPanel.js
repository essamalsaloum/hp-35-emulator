import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import store from '../store'
import C from '../processor/keyCodes'
import * as processor from '../processor'
import TabTemplate from '../components/TabTemplate'
import ProgramTab from '../components/ProgramTab'
import InspectTab from '../components/InspectTab'
import './ProgramPanel.css'

// see: https://github.com/callemall/material-ui/issues/2085

const tabStyles = {
  root: {
    flex: '1 1 100%',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    flex: '1 1 100%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  }
}

export default class ProgramPanel extends React.PureComponent {
  state = {
    text: '',
    keyCodes: []
  }

  singleStepIterator = null

  constructor() {
    super()
    this.onTextChange = this.onTextChange.bind(this)
    this.runStop = this.runStop.bind(this)
    this.clear = this.clearProgram.bind(this)
    this.singleStep = this.singleStep.bind(this)
    this.toggleRecording = this.toggleRecording.bind(this)
  }

  componentWillMount() {
    this.storeSubscription = store.subscribe(({ recording, running }) => {
      this.setState({ recording, running })
    })
    this.processorSubscription = processor.subscribe(keyCode => {
      if (this.state.recording && keyCode !== C.CLR) {
        this.setState(prevState => ({ text: prevState.text + keyCode + '\n' }))
      }
    })
  }

  componentWillUnmount() {
    this.storeSubscription.remove()
    this.processorSubscription.remove()
  }

  toggleRecording(ev, isInputChecked) {
    const recording = isInputChecked
    if (recording) {
      this.setState({ text: '' })
    }
    store.setState({ recording })
  }

  runStop() {
    const { running } = store.getState()
    if (running) {
      return store.setState({ running: false })
    }

    const { keyCodes, text, error } = processor.compile(this.state.text)
    this.setState({ keyCodes })
    if (error) {
      this.setState({ text })
      return
    }

    store.setState({ running: true, recording: false, shiftKey: null })
    processor.runProg(keyCodes)
      .then(() => {
        store.setState({ running: false })
      })
  }

  singleStep() {
    if (this.singleStepIterator === null) {
      const { keyCodes, error, text } = processor.compile(this.state.text)
      this.setState({ keyCodes })
      if (error) {
        this.setState({ text })
        return
      }
      store.setState({ running: true, recording: false, shiftKey: null })
      this.singleStepIterator = processor.createSingleStepIterator(keyCodes)
    }

    const { done } = this.singleStepIterator.next()
    if (done) {
      this.singleStepIterator = null
      store.setState({ running: false })
    }
  }

  clearProgram() {
    this.setState({ text: '', keyCodes: [] })
  }

  onTextChange(event) {
    const text = event.target.value
    this.setState({ text })
    store.setState({ running: false, shiftKey: null })
  }

  render() {
    const { text, keyCodes, recording, running } = this.state
    return (
      <div className="ProgramPanel">
        <Tabs
          style={tabStyles.root}
          contentContainerStyle={tabStyles.container}
          tabTemplate={TabTemplate}
        >
          <Tab label="Program">
            <ProgramTab
              text={text}
              recording={recording}
              running={running}
              onTextChange={this.onTextChange}
              onToggleRecording={this.toggleRecording}
              onClearProgram={this.clearProgram}
              onRunStop={this.runStop}
            />
          </Tab>
          <Tab label="Inspect">
            <InspectTab
              keyCodes={keyCodes}
              index={0}
              onRunStop={() => undefined}
              onSingleStep={this.singleStep}
            />
          </Tab>
        </Tabs>
      </div>
    )
  }
}