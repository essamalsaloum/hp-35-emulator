import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import Toggle from 'material-ui/Toggle'
import RunStopButton from '../components/RunStopButton'
import DeleteButton from '../components/DeleteButton'
import store from '../store'
import * as processor from '../processor'

export default class ProgramToolbar extends React.PureComponent {

  static propTypes = {
    initialState: PropTypes.object.isRequired
  }

  state = {}

  get noText() {
    return this.state.text.trim() === ''
  }

  constructor(props) {
    super(props)
    this.toggleRecording = this.toggleRecording.bind(this)
    this.runStop = this.runStop.bind(this)
    this.clearProgram = this.clearProgram.bind(this)
  }

  componentWillMount() {
    this.subscription = store.subscribe(({ program }) => {
      this.setState(program)
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  toggleRecording(ev, isInputChecked) {
    const recording = isInputChecked
    if (recording) {
      store.setState({
        program: {
          ...this.state,
          recording: true,
          text: '',
          keyCodes: []
        }
      })
    } else {
      store.setState({
        program: {
          ...this.state,
          recording: false
        }
      })
    }
  }

  runStop() {
    if (this.state.running) {
      store.setState({
        program: {
          ...this.state,
          running: false
        }
      })
      return
    }

    const {text, keyCodes, error} = processor.compile(this.state.text)

    if (error) {
      store.setState({
        program: {
          ...this.props.initialState,
          text
        }
      })
      return
    }
    store.setState({
      program: {
        ...this.state,
        running: true,
        recording: false
      }
    })

    processor.runProg(keyCodes)
      .then(() => {
        store.setState({
          program: {
            ...this.state,
            running: false
          }
        })
      })
  }

  clearProgram() {
    store.setState({
      program: {
        text: '',
        keyCodes: [],
        nextIndex: 0,
        running: false,
        error: false
      }
    })
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} style={{ paddingLeft: 8 }}>
          <Toggle
            label="Recording"
            labelPosition="right"
            disabled={this.state.running}
            toggled={this.state.recording}
            onToggle={this.toggleRecording}
          />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <DeleteButton onClick={this.clearProgram} disabled={this.noText} />
          <RunStopButton onClick={this.runStop} disabled={this.noText} running={this.state.running} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
