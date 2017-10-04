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
import C from '../cpu/keyCodes'
import { executeKeyCode, memorySelector } from '../cpu/reducer'
import { setMainPanel } from '../ducks/ui'
import './MemoryPanel.css'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const keyCodes = [
  [C.RCL_A, C.STO_A],
  [C.RCL_B, C.STO_B],
  [C.RCL_C, C.STO_C],
  [C.RCL_D, C.STO_D],
  [C.RCL_E, C.STO_E],
  [C.RCL_F, C.STO_F],
  [C.RCL_G, C.STO_G],
  [C.RCL_H, C.STO_H],
  [C.RCL_I, C.STO_I],
  [C.RCL_J, C.STO_J],
  [C.RCL_K, C.STO_K],
  [C.RCL_L, C.STO_L],
  [C.RCL_M, C.STO_M],
  [C.RCL_N, C.STO_N],
  [C.RCL_O, C.STO_O],
  [C.RCL_P, C.STO_P],
  [C.RCL_Q, C.STO_Q],
  [C.RCL_R, C.STO_R],
  [C.RCL_S, C.STO_S],
  [C.RCL_T, C.STO_T],
  [C.RCL_U, C.STO_U],
  [C.RCL_V, C.STO_V],
  [C.RCL_W, C.STO_W],
  [C.RCL_X, C.STO_X],
  [C.RCL_Y, C.STO_Y],
  [C.RCL_Z, C.STO_Z],
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
      this.props.setMainPanel('keypad')
    }
  }

  renderText(index) {
    const { memory } = this.props
    const num = memory[index]
    if (Number.isFinite(num)) {
      return <div style={{ color: pinkA700 }}>{num}</div>
    } else {
      return <div style={{ opacity: 0.5 }}>0</div>
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
          onClick={() => this.onClick(keyCodes[i][0])}
          rightIconButton={
            <MemoryUpdateButton
              onClick={() => this.onClick(keyCodes[i][1], false)}
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