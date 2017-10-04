import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import { indigoA200, pinkA700, blueGrey400 } from 'material-ui/styles/colors'
import MemoryUpdateButton from '../components/MemoryUpdateButton'
import ChildToolbar from '../components/ChildToolbar'
import C from '../constants'
import K from '../cpu/keyCodes'
import { executeKeyCode, memorySelector } from '../cpu/reducer'
import { setMainPanel } from '../ducks/ui'
import './MemoryPanel.css'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const keyCodes = [
  [K.RCL_A, K.STO_A],
  [K.RCL_B, K.STO_B],
  [K.RCL_C, K.STO_C],
  [K.RCL_D, K.STO_D],
  [K.RCL_E, K.STO_E],
  [K.RCL_F, K.STO_F],
  [K.RCL_G, K.STO_G],
  [K.RCL_H, K.STO_H],
  [K.RCL_I, K.STO_I],
  [K.RCL_J, K.STO_J],
  [K.RCL_K, K.STO_K],
  [K.RCL_L, K.STO_L],
  [K.RCL_M, K.STO_M],
  [K.RCL_N, K.STO_N],
  [K.RCL_O, K.STO_O],
  [K.RCL_P, K.STO_P],
  [K.RCL_Q, K.STO_Q],
  [K.RCL_R, K.STO_R],
  [K.RCL_S, K.STO_S],
  [K.RCL_T, K.STO_T],
  [K.RCL_U, K.STO_U],
  [K.RCL_V, K.STO_V],
  [K.RCL_W, K.STO_W],
  [K.RCL_X, K.STO_X],
  [K.RCL_Y, K.STO_Y],
  [K.RCL_Z, K.STO_Z],
]

class MemoryPanel extends React.PureComponent {

  static propTypes = {
    executeKeyCode: PropTypes.func.isRequired,
    memory: PropTypes.array.isRequired,
    setMainPanel: PropTypes.func.isRequired,
  }

  onClick(keyCode, goBack = true) {
    this.props.executeKeyCode(keyCode)
    if (goBack) {
      this.props.setMainPanel(C.KEYPAD_PANEL)
    }
  }

  renderText(index) {
    const { memory } = this.props
    const num = memory[index]
    if (Number.isFinite(num)) {
      return <div style={{ color: pinkA700 }}>{num}</div>
    } else {
      return <div style={{ opacity: 0.5 }}>-</div>
    }
  }

  renderListByUsage(type = 'used') {
    const { memory } = this.props
    const list = []
    for (let i = 0; i < ALPHABET.length; i++) {
      const letter = ALPHABET.charAt(i)
      const skip = type === 'used' ? memory[i] === undefined : memory[i] !== undefined
      if (skip) {
        continue
      }
      list.push(
        <ListItem
          key={i}
          leftAvatar={
            <Avatar color='white'
              backgroundColor={type === 'used' ? indigoA200 : blueGrey400}
              size={30}
              style={{ margin: 5 }}
            >
              {letter}
            </Avatar>
          }
          primaryText={this.renderText(i)}
          onClick={type === 'used' ? () => this.onClick(keyCodes[i][0]) : null}
          rightIconButton={
            <MemoryUpdateButton
              onClick={() => this.onClick(keyCodes[i][1], false)}
              tooltip="assign"
              tooltipPosition="bottom-left"
            />
          }
        />
      )
    }
    return list
  }

  renderList() {
    const usedList = this.renderListByUsage('used')
    const unusedList = this.renderListByUsage('unused')

    if (usedList.length === 0) {
      return (
        <div>
          <Subheader>{`Unassigned (${unusedList.length})`}</Subheader>
          {unusedList}
        </div>
      )
    } else {
      return (
        <div>
          <Subheader>{`Assigned (${usedList.length})`}</Subheader>
          {usedList}
          <Subheader>{`Unassigned (${unusedList.length})`}</Subheader>
          {unusedList}
        </div>
      )
    }
  }

  render() {
    return (
      <div className="MemoryPanel">
        <ChildToolbar title="Memory Registers" onBackClick={() => this.props.setMainPanel('keypad')} />
        <List className="MemoryPanel--list">
          {this.renderList()}
        </List>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  memory: memorySelector(state),
})


const mapDispatchToProps = dispatch =>
  bindActionCreators({
    executeKeyCode,
    setMainPanel,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MemoryPanel)