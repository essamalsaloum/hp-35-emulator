import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProgramToolbar from './ProgramToolbar'
import ProgramTextArea from '../components/ProgramTextArea'
import ProgramTextMarkdown from '../components/ProgramTextMarkdown'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { refreshProgramText, programTextSelector, isMarkdownSelector, isRecordingSelector } from '../ducks/program'
import { loadingSelector } from '../ducks/library'
import K from '../cpu/keyCodes'
import cpu from '../cpu'
import './ProgramTab.css'

const REFRESHER_SIZE = 35

const resetState = {
  text: '',
  keyCodes: [],
  ip: 0,
  error: false,
  isRunning: false,
  recording: false
}

class ProgramTab extends React.PureComponent {

  refresherTop = 0
  refresherLeft = 0

  state = {
    error: null
  }

  static propTypes = {
    programText: PropTypes.string,
    refreshProgramText: PropTypes.func.isRequired,
    isMarkdown: PropTypes.bool.isRequired,
    recording: PropTypes.bool.isRequired,
    loading: PropTypes.bool,
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

  componentDidMount() {
    this.refresherTop = (this.container.clientHeight - REFRESHER_SIZE) / 2
    this.refresherLeft = (this.container.clientWidth - REFRESHER_SIZE) / 2
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
    const { loading } = this.props
    return (
      <div className="ProgramTab"
        ref={container => { this.container = container }}
      >
        <RefreshIndicator
          size={REFRESHER_SIZE}
          left={this.refresherLeft}
          top={this.refresherTop}
          status={loading ? 'loading' : 'hide'}
          className="ProgramTab--refresh"
        />

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
  recording: isRecordingSelector(state),
  loading: loadingSelector(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProgramTab)