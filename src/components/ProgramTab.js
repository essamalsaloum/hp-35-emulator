import React from 'react'
import PropTypes from 'prop-types'
import ProgramToolbar from '../components/ProgramToolbar'

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  textarea: {
    padding: 8,
    borderStyle: 'none',
    backgroundColor: '#fafafa',
    resize: 'none',
    fontFamily: `'Roboto', sans-serif`,
    fontSize: 14,
    flex: 1
  }
}

const ProgramTab = props => (
  <div style={styles.container}>
    <textarea
      autoCapitalize="none"
      autoComplete="off"
      placeholder={props.recording ? '' : 'Enter your program here'}
      spellCheck="false"
      value={props.text}
      onChange={props.onTextChange}
      style={styles.textarea}
    />
    <ProgramToolbar {...props} />
  </div>
)

ProgramTab.propTypes = {
  recording: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,
}

export default ProgramTab
