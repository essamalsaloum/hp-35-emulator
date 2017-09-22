import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import Pause from 'material-ui/svg-icons/av/pause'
import { grey700 } from 'material-ui/styles/colors'

const RunStopButton = ({ onClick, disabled, running }) => {
  const iconProps = {
    color: grey700
  }

  const icon = running ? <Pause /> : <PlayArrow {...iconProps} />
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      tooltip="run"
      tooltipPosition="top-left"
    >
      {icon}
    </IconButton>
  )
}

const noop = () => undefined

RunStopButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  running: PropTypes.bool
}

RunStopButton.defaultProps = {
  onClick: noop,
  disabled: false,
  running: false
}

export default RunStopButton