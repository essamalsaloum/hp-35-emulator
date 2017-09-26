import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProgramToolbar from './ProgramToolbar'
import store from '../store'
import { setProgramText } from '../actions/currentProgram'
import { getProgramText } from '../reducers/currentProgram'
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
    setProgramText: PropTypes.func.isRequired
  }

  state = {}
  subscriptions = []
  updateProgramState = store.setSubState('program')

  constructor() {
    super()
    this.onTextChange = this.onTextChange.bind(this)
  }

  onTextChange(event) {
    this.props.setProgramText(event.target.value)
  }

  resetState() {
    this.updateProgramState({ ...resetState })
  }

  render() {
    return (
      <div className="ProgramTab">
        <textarea
          className="ProgramTab--textarea"
          autoCapitalize="none"
          autoComplete="off"
          placeholder={this.state.recording ? '' : 'Enter your program here'}
          spellCheck="false"
          value={this.props.programText}
          onChange={this.onTextChange}
        />
        <ProgramToolbar initialState={{ ...resetState }} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setProgramText,
  }, dispatch)

const mapStateToProps = state => ({
  programText: getProgramText(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProgramTab)