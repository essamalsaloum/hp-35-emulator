import React from 'react'
import PropTypes from 'prop-types'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import memoryIconMenu from '../components/memoryIconMenu'
import { indigoA200, pinkA700, grey400 } from 'material-ui/styles/colors'
import { formatNumber } from '../cpu/util'

export default function MemoryPanelItem({ letter, value }) {
  return (
    <ListItem
      key={letter}
      leftAvatar={
        <Avatar color='white'
          backgroundColor={type === 'used' ? indigoA200 : grey400}
          size={30}
          style={{ margin: 5 }}
        >
          {letter}
        </Avatar>
      }
      primaryText={this.renderText(i)}
      rightIconButton={memoryIconMenu(i, hasValue, this.onMenuAction)}
    />
  )
}

const renderText = value => {
  if (Number.isFinite(value)) {
    return <div style={{ color: pinkA700 }}>{formatNumber(value)}</div>
  } else {
    return <div style={{ opacity: 0.5 }}>-</div>
  }
}

MemoryPanelItem.propTypes = {
  letter: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}