import React from 'react'
import PropTypes from 'prop-types'
import { grey700 } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import SvgIcon from 'material-ui/SvgIcon'

const StepBackwardIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M19,5V19H16V5M14,5V19L3,12" />
  </SvgIcon>
)

const BackStepButton = ({ onClick, disabled }) => (
  <IconButton
    onClick={onClick}
    disabled={disabled}
    tooltip="step backward"
    tooltipPosition="top-left"
  >
    <StepBackwardIcon color={grey700} />
  </IconButton>
)

const noop = () => undefined

BackStepButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

BackStepButton.defaultProps = {
  onClick: noop,
  disabled: false
}

export default BackStepButton