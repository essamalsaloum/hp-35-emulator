import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import { grey700 } from 'material-ui/styles/colors'

const DeleteButton = ({ onClick, disabled }) => (
  <IconButton onClick={onClick} disabled={disabled}>
    <Delete color={grey700} />
  </IconButton>
)

const noop = () => undefined

DeleteButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

DeleteButton.defaultProps = {
  onClick: noop,
  disabled: false
}

export default DeleteButton