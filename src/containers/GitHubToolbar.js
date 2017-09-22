import React from 'react'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
import store from '../store'

const updateProgramTabState = store.setSubState('programTab')

export default class GitHubToolbar extends React.PureComponent {

  render() {
    return (
      <Toolbar>
        <ToolbarGroup>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <FlatButton label="Done" primary={true} onClick={() => updateProgramTabState({mode: 'program'})} />
        </ToolbarGroup>
      </Toolbar >
    )
  }
}