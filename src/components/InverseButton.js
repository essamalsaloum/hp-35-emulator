import React from 'react'
import IconButton from 'material-ui/IconButton'
import SwapHoriz from 'material-ui/svg-icons/action/swap-horiz'
import { grey500 } from 'material-ui/styles/colors'

export default function InverseButton(props) {
  return (
    <IconButton  {...props}>
      <SwapHoriz color={grey500} />
    </IconButton>
  )
}