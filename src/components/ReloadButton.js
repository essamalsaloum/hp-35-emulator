import React from 'react'
import PropTypes from 'prop-types'
import { grey700 } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import Refresh from 'material-ui/svg-icons/navigation/refresh'

const ReloadButton = ({ onClick, disabled }) => (
  <IconButton
    onClick={onClick}
    disabled={disabled}
    tooltip="reload"
    tooltipPosition="top-left"
  >
    <Refresh color={grey700} />
  </IconButton>
)

const noop = () => undefined

ReloadButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

ReloadButton.defaultProps = {
  onClick: noop,
  disabled: false
}

export default ReloadButton