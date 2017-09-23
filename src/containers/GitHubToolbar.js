import React from 'react'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import store from '../store'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { grey700 } from 'material-ui/styles/colors'

const updateProgramTabState = store.setSubState('programTab')

export default function GitHubToolbar() {
  return (
    <Toolbar>
      <ToolbarGroup firstChild={true}>
        <IconButton onClick={() => updateProgramTabState({ mode: 'program' })} >
          <ArrowBack color={grey700} />
        </IconButton>
      </ToolbarGroup>
    </Toolbar >
  )
}