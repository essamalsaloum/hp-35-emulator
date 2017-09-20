import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import Redo from 'material-ui/svg-icons/content/redo'
import { grey700 } from 'material-ui/styles/colors'

const SingleStepButton = ({ onClick, disabled }) => (
  <IconButton onClick={onClick} disabled={disabled}>
    <Redo color={grey700} />
  </IconButton>
)

const noop = () => undefined

SingleStepButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

SingleStepButton.defaultProps = {
  onClick: noop,
  disabled: false
}

export default SingleStepButton