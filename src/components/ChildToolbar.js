import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { grey700 } from 'material-ui/styles/colors'

export default function ChildToolbar(props) {
  return (
    <Toolbar>
      <ToolbarGroup firstChild={true}>
        <IconButton onClick={props.onBackClick} >
          <ArrowBack color={grey700} />
        </IconButton>
        <ToolbarTitle text={props.title} />
      </ToolbarGroup>
    </Toolbar >
  )
}

ChildToolbar.propTypes = {
  title: PropTypes.string,
  onBackClick: PropTypes.func.isRequired
}

ChildToolbar.defaultProps = {
  title: ''
}