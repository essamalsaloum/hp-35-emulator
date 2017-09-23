import React from 'react'
import PropTypes from 'prop-types'
import { grey700 } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import SvgIcon from 'material-ui/SvgIcon'

export default function SvgIconButton({ path, ...rest }) {
  return (
    <IconButton {...rest} >
      <SvgIcon color={grey700}>
        <path d={path} />
      </SvgIcon>
    </IconButton>
  )
}

SvgIconButton.propTypes = {
  path: PropTypes.string.isRequired,
}
