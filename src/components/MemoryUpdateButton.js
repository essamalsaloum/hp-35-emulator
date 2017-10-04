import React from 'react'
import IconButton from 'material-ui/IconButton'
import Reply from 'material-ui/svg-icons/content/reply'
import { grey500 } from 'material-ui/styles/colors'

export default function MemoryUpdateButton(props) {
  return (
    <IconButton  {...props}>
      <Reply color={grey500} />
    </IconButton>
  )
}
