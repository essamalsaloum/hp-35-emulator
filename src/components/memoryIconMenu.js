import React from 'react'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { grey400 } from 'material-ui/styles/colors'
import K from '../cpu/keyCodes'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const iconButtonElement = (
  <IconButton touch={true} >
    <MoreVertIcon color={grey400} />
  </IconButton>
)

export default function memoryIconMenu(index, hasValue, onClick) {
  return (
    <IconMenu
      iconButtonElement={iconButtonElement}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <MenuItem key={K.RCL} value={K.RCL} disabled={!hasValue} primaryText="RCL" onClick={() => onClick(K.RCL, index)} />
      <MenuItem key={K.STO} value={K.STO} onClick={() => onClick(K.STO, index)} primaryText="STO" />
      <MenuItem key={K.MEM_SWAP} value={K.MEM_SWAP} disabled={!hasValue} onClick={() => onClick(K.MEM_SWAP, index)}>{`SWAP ${ALPHABET[index]}↔︎x`}</MenuItem>
      <MenuItem
        primaryText="RCL..."
        rightIcon={<ArrowDropRight />}
        menuItems={[
          <MenuItem key={K.RCL_ADD} value={K.RCL_ADD} disabled={!hasValue} primaryText="RCL +" onClick={() => onClick(K.RCL_ADD, index)} />,
          <MenuItem key={K.RCL_SUB} value={K.RCL_SUB} disabled={!hasValue} primaryText="RCL −" onClick={() => onClick(K.RCL_SUB, index)} />,
          <MenuItem key={K.RCL_MUL} value={K.RCL_MUL} disabled={!hasValue} primaryText="RCL ×" onClick={() => onClick(K.RCL_MUL, index)} />,
          <MenuItem key={K.RCL_DIV} value={K.RCL_DIV} disabled={!hasValue} primaryText="RCL ÷" onClick={() => onClick(K.RCL_DIV, index)} />,
        ]}
      />
      <MenuItem
        primaryText="STO..."
        rightIcon={<ArrowDropRight />}
        menuItems={[
          <MenuItem key={K.STO_ADD} value={K.STO_ADD} disabled={!hasValue} primaryText="STO +" onClick={() => onClick(K.STO_ADD, index)} />,
          <MenuItem key={K.STO_SUB} value={K.STO_SUB} disabled={!hasValue} primaryText="STO −" onClick={() => onClick(K.STO_SUB, index)} />,
          <MenuItem key={K.STO_MUL} value={K.STO_MUL} disabled={!hasValue} primaryText="STO ×" onClick={() => onClick(K.STO_MUL, index)} />,
          <MenuItem key={K.STO_DIV} value={K.STO_DIV} disabled={!hasValue} primaryText="STO ÷" onClick={() => onClick(K.STO_DIV, index)} />,
        ]}
      />
    </IconMenu>
  )
}
