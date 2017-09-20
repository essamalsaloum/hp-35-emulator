import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import RunStopButton from './RunStopButton'
import SingleStepButton from './SingleStepButton'

const InspectToolbar = props => {
  return (
    <Toolbar>
      <ToolbarGroup firstChild={true}>
      </ToolbarGroup>
      <ToolbarGroup lastChild={true}>
        <RunStopButton onClick={props.onRunStop} running={props.running} />
        <SingleStepButton onClick={props.onSingleStep} />
      </ToolbarGroup>
    </Toolbar>
  )
}

InspectToolbar.propTypes = {
  running: PropTypes.bool.isRequired,
  onRunStop: PropTypes.func.isRequired,
  onSingleStep: PropTypes.func.isRequired
}

export default InspectToolbar