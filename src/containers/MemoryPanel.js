import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import { indigoA200, pinkA700, grey400 } from 'material-ui/styles/colors'
import MemoryToolbar from '../components/MemoryToolbar'
import memoryIconMenu from '../components/memoryIconMenu'
import K from '../cpu/keyCodes'
import C from '../constants'
import { executeKeyCode, memorySelector } from '../cpu/reducer'
import { setMainPanel } from '../ducks/ui'
import { formatNumber } from '../cpu/util'
import './MemoryPanel.css'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const RCL_KEYCODES = new Set([
  K.RCL,
  K.RCL_ADD,
  K.RCL_SUB,
  K.RCL_DIV,
  K.RCL_MUL
])

class MemoryPanel extends React.PureComponent {

  static propTypes = {
    executeKeyCode: PropTypes.func.isRequired,
    memory: PropTypes.array.isRequired,
    setMainPanel: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.onMenuAction = this.onMenuAction.bind(this)
  }

  renderText(index) {
    const { memory } = this.props
    const num = memory[index]
    if (Number.isFinite(num)) {
      return <div style={{ color: pinkA700 }}>{formatNumber(num)}</div>
    } else {
      return <div style={{ opacity: 0.5 }}>-</div>
    }
  }

  onMenuAction(keyCode, index) {
    const { executeKeyCode, setMainPanel } = this.props
    const instruction = `${keyCode}.${ALPHABET[index]}`.toLowerCase()
    executeKeyCode(instruction)
    if (RCL_KEYCODES.has(keyCode)) {
      setMainPanel(C.KEYPAD_PANEL)
    }
  }

  renderListByUsage(type = 'used') {
    const { memory } = this.props
    const list = []
    for (let i = 0; i < ALPHABET.length; i++) {
      const letter = ALPHABET.charAt(i)
      const hasValue = Number.isFinite(memory[i])
      const skip = type === 'used' ? !hasValue : hasValue
      if (skip) {
        continue
      }
      list.push(
        <ListItem
          key={i}
          leftAvatar={
            <Avatar color='white'
              backgroundColor={type === 'used' ? indigoA200 : grey400}
              size={30}
              style={{ margin: 5 }}
            >
              {letter}
            </Avatar>
          }
          onClick={type === 'used' ? () => this.onMenuAction(K.RCL, i) : null}
          primaryText={this.renderText(i)}
          rightIconButton={memoryIconMenu(i, hasValue, this.onMenuAction)}
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
        <MemoryToolbar onBackClick={() => this.props.setMainPanel('keypad')} />
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