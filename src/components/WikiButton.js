import React from 'react'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import { grey500 } from 'material-ui/styles/colors'

export default function WikiButton(props) {
  return (
    <IconButton {...props}>
      <FontIcon className="fa fa-external-link" color={grey500} />
    </IconButton>
  )
}

