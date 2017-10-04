import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProgramToolbar from './ProgramToolbar'
import ProgramTextArea from '../components/ProgramTextArea'
import ProgramTextMarkdown from '../components/ProgramTextMarkdown'
import { refreshProgramText, programTextSelector, isMarkdownSelector, isRecordingSelector } from '../ducks/program'
import K from '../cpu/keyCodes'
import cpu from '../cpu'
import './ProgramTab.css'

const resetState = {
  text: '',
  keyCodes: [],
  ip: 0,
  error: false,
  isRunning: false,
  recording: false
}

class ProgramTab extends React.PureComponent {

  state = {
    error: null
  }

  static propTypes = {
    programText: PropTypes.string,
    refreshProgramText: PropTypes.func.isRequired,
    isMarkdown: PropTypes.bool.isRequired,
    recording: PropTypes.bool.isRequired,
  }

  subscriptions = []

  constructor() {
    super()
    this.onTextChange = this.onTextChange.bind(this)
  }

  componentWillMount() {
    this.subscription = cpu.subscribe(keyCode => {
      if (this.props.recording && keyCode !== K.CLR) {
        const text = this.props.programText + keyCode + '\n'
        this.props.refreshProgramText(text)
      }
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  onTextChange(event) {
    this.props.refreshProgramText(event.target.value)
  }

  resetState() {
    this.updateProgramState({ ...resetState })
  }

  renderError() {
    const { error } = this.state
    if (!error) {
      return null
    }
    return (
      <div className="ProgramTab--error">
        {error.message.split('\n').map((line, index) => (
          <div key={index}>{line}</div>)
        )}
      </div>
    )
  }

  renderProgramText() {
    const { programText, isMarkdown, recording } = this.props

    if (isMarkdown) {
      return (
        <ProgramTextMarkdown
          programText={programText}
        />
      )
    } else {
      return (
        <ProgramTextArea
          programText={programText}
          onTextChange={this.onTextChange}
          recording={recording}
        />
      )
    }
  }

  render() {
    return (
      <div className="ProgramTab">
        {this.renderProgramText()}
        {this.renderError()}
        <ProgramToolbar
          initialState={{ ...resetState }}
          setError={error => this.setState({ error })}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    refreshProgramText,
  }, dispatch)

const mapStateToProps = state => ({
  programText: programTextSelector(state),
  isMarkdown: isMarkdownSelector(state),
  recording: isRecordingSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProgramTab)