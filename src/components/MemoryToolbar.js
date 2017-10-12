import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import FlatButton from 'material-ui/FlatButton'
import { grey700 } from 'material-ui/styles/colors'


export default function MemoryToolbar({ onBackClick, onClearAllClick, disabled }) {
  return (
    <Toolbar>
      <ToolbarGroup firstChild={true}>
        <IconButton onClick={onBackClick} >
          <ArrowBack color={grey700} />
        </IconButton>
      </ToolbarGroup>
      <ToolbarGroup lastChild={true}>
        <FlatButton label="Clear All" onClick={onClearAllClick} disabled={disabled} />
      </ToolbarGroup>
    </Toolbar >
  )
}

MemoryToolbar.propTypes = {
  onBackClick: PropTypes.func,
  onClearAllClick: PropTypes.func,
  disabled: PropTypes.bool,
}

const noop = () => undefined

MemoryToolbar.defaultProps = {
  onBackClick: noop,
  onClearAllClick: noop,
  disabled: true,
}

