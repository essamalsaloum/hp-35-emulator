import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default function AlertDialog({ prompt, open, handleClose }) {
  const actions = [
    <FlatButton
      key="cancel"
      label="Cancel"
      primary={true}
      onClick={() => handleClose(false)}
    />,
    <FlatButton
      key="ok"
      label="OK"
      primary={true}
      onClick={() => handleClose(true)}
    />,
  ]
  return (
    <div>
      <Dialog
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={() => handleClose(false)}
      >
        {prompt}
      </Dialog>
    </div>
  )
}

AlertDialog.propTypes = {
  prompt: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}