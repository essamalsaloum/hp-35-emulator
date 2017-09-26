import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { grey700 } from 'material-ui/styles/colors'

export default function GitHubToolbar(props) {
  return (
    <Toolbar>
      <ToolbarGroup firstChild={true}>
        <IconButton onClick={props.onBackClick} >
          <ArrowBack color={grey700} />
        </IconButton>
      </ToolbarGroup>
    </Toolbar >
  )
}

GitHubToolbar.propTypes = {
  onBackClick: PropTypes.func.isRequired
}