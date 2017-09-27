import React from 'react'
import PropTypes from 'prop-types'
import './ProgramTextArea.css'

export default function ProgramTextArea({ programText, onTextChange, recording }) {
  return (
    <textarea
      className="ProgramTextArea"
      autoCapitalize="none"
      autoComplete="off"
      placeholder={recording ? '' : 'Enter your program here'}
      spellCheck="false"
      value={programText}
      onChange={onTextChange}
    />
  )
}

ProgramTextArea.propTypes = {
  programText: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,
  recording: PropTypes.bool.isRequired
}