import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProgramToolbar from './ProgramToolbar'
import ProgramTextArea from '../components/ProgramTextArea'
import ProgramTextMarkdown from '../components/ProgramTextMarkdown'
import { setProgramText, programTextSelector, fromGitHubSelector, recordingSelector } from '../modules/program'
import C from '../processor/keyCodes'
import processor from '../processor'
import './ProgramTab.css'

const resetState = {
  text: '',
  keyCodes: [],
  ip: 0,
  error: false,
  running: false,
  recording: false
}

class ProgramTab extends React.PureComponent {

  static propTypes = {
    programText: PropTypes.string,
    setProgramText: PropTypes.func.isRequired,
    fromGitHub: PropTypes.bool.isRequired,
    recording: PropTypes.bool.isRequired,
  }

  subscriptions = []

  constructor() {
    super()
    this.onTextChange = this.onTextChange.bind(this)
  }

  componentWillMount() {
    this.subscription = processor.subscribe(keyCode => {
      if (this.props.recording && keyCode !== C.CLR) {
        const text =this.props.programText + keyCode + '\n'
        this.props.setProgramText(text)
      }
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  onTextChange(event) {
    this.props.setProgramText(event.target.value)
  }

  resetState() {
    this.updateProgramState({ ...resetState })
  }

  renderProgramText() {
    const { programText, fromGitHub, recording } = this.props

    if (fromGitHub) {
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
        <ProgramToolbar
          initialState={{ ...resetState }}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setProgramText,
  }, dispatch)

const mapStateToProps = state => ({
  programText: programTextSelector(state),
  fromGitHub: fromGitHubSelector(state),
  recording: recordingSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProgramTab)