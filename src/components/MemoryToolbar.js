import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import FlatButton from 'material-ui/FlatButton'
import { grey700 } from 'material-ui/styles/colors'

const style = {
  minWidth: 'auto',
  margin: 0
}

export default function MemoryToolbar({ onBackClick, onStoreClick, onStorePlusClick, onRecallClick, onRecallPlusClick, disabled }) {
  return (
    <Toolbar>
      <ToolbarGroup firstChild={true}>
        <IconButton onClick={onBackClick} >
          <ArrowBack color={grey700} />
        </IconButton>
      </ToolbarGroup>
      <ToolbarGroup>
        <FlatButton label="STO" onClick={onStoreClick} style={style} disabled={disabled} />
        <FlatButton label="STO+" onClick={onStorePlusClick} style={style} disabled={disabled}/>
        <FlatButton label="RCL" onClick={onRecallClick} style={style} disabled={disabled}/>
        <FlatButton label="RCL+" onClick={onRecallPlusClick} style={style} disabled={disabled}/>
      </ToolbarGroup>
    </Toolbar >
  )
}

MemoryToolbar.propTypes = {
  onBackClick: PropTypes.func,
  onStoreClick: PropTypes.func,
  onStorePlusClick: PropTypes.func,
  onRecallClick: PropTypes.func,
  onRecallPlusClick: PropTypes.func,
  disabled: PropTypes.bool,
}

const noop = () => undefined

MemoryToolbar.defaultProps = {
  onBackClick: noop,
  onStoreClick: noop,
  onStorePlusClick: noop,
  onRecallClick: noop,
  onRecallPlusClick: noop,
  disabled: true,
}

