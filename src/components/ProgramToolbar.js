import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import Toggle from 'material-ui/Toggle'
import RunStopButton from './RunStopButton'
import DeleteButton from './DeleteButton'

const ProgramToolbar = props => {
  const noText = props.text.trim() === ''
  return (
    <Toolbar>
      <ToolbarGroup firstChild={true} style={{ paddingLeft: 8 }}>
        <Toggle
          label="Recording"
          labelPosition="right"
          toggled={props.recording}
          onToggle={props.onToggleRecording}
          disabled={props.running}
        />
      </ToolbarGroup>
      <ToolbarGroup lastChild={true}>
        <DeleteButton onClick={props.onClearProgram} disabled={noText} />
        <RunStopButton onClick={props.onRunStop} disabled={noText} running={props.running} />
      </ToolbarGroup>
    </Toolbar>
  )
}

ProgramToolbar.propTypes = {
  text: PropTypes.string.isRequired,
  recording: PropTypes.bool.isRequired,
  running: PropTypes.bool.isRequired,
  onToggleRecording: PropTypes.func.isRequired,
  onClearProgram: PropTypes.func.isRequired,
  onRunStop: PropTypes.func.isRequired
}

export default ProgramToolbar