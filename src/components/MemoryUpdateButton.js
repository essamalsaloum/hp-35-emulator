import React from 'react'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

export default function MemoryUpdateButton(props) {
  return (
    <IconButton  {...props}>
      <FontIcon
        className="fa fa-mail-reply"
        style={{ opacity: 0.7 }}
      />
    </IconButton>
  )
}
