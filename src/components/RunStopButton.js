import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import Pause from 'material-ui/svg-icons/av/pause'
import { grey700 } from 'material-ui/styles/colors'

export default function RunStopButton({ runFlag, ...rest }) {
  const iconProps = {
    color: grey700
  }

  const icon = runFlag ? <Pause {...iconProps} /> : <PlayArrow {...iconProps} />

  return (
    <IconButton  {...rest}>
      {icon}
    </IconButton>
  )
}

RunStopButton.propTypes = {
  runFlag: PropTypes.bool.isRequired
}
