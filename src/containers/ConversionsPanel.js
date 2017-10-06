import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import SwapHoriz from 'material-ui/svg-icons/action/swap-horiz'
import ChildToolbar from '../components/ChildToolbar'
import { executeKeyCode } from '../cpu/reducer'
import { setMainPanel } from '../ducks/ui'
import C from '../constants'
import K from '../cpu/keyCodes'
import './ConversionsPanel.css'

const conversions = {
  [K.TO_RAD]: 'degrees → radians',
  [K.TO_DEG]: 'radians → degrees',
  [K.TO_CM]: 'inches → cm',
  [K.TO_IN]: 'cm → inches',
  [K.TO_KM]: 'mile → km',
  [K.TO_MILE]: 'km → mile',
  [K.TO_KG]: 'lb → kg',
  [K.TO_LB]: 'kg → lb',
  [K.TO_L]: 'gal → l',
  [K.TO_GAL]: 'l → gal',
  [K.TO_DEGREE_F]: '°C → °F',
  [K.TO_DEGREE_C]: '°F → °C',
}

class ConversionsPanel extends React.PureComponent {

  static propTypes = {
    executeKeyCode: PropTypes.func.isRequired,
    setMainPanel: PropTypes.func.isRequired,
  }

  onItemClick(value) {
    this.props.executeKeyCode(value)
    this.props.setMainPanel(C.KEYPAD_PANEL)
  }

  renderList() {
    return Object.keys(conversions).map(keyCode => (
      <ListItem
        key={keyCode}
        leftAvatar={<Avatar icon={<SwapHoriz />} />}
        primaryText={<div dangerouslySetInnerHTML={{ __html: conversions[keyCode] }} />}
        onClick={() => this.onItemClick(keyCode)}
      />
    ))
  }

  render() {
    return (
      <div className="ConversionsPanel">
        <ChildToolbar title="Conversions" onBackClick={() => this.props.setMainPanel(C.KEYPAD_PANEL)} />
        <List className="ConversionsPanel--list">
          {this.renderList()}
        </List>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    executeKeyCode,
    setMainPanel,
  }, dispatch)

export default connect(null, mapDispatchToProps)(ConversionsPanel)