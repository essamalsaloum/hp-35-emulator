import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List, ListItem } from 'material-ui/List'
import ChildToolbar from '../components/ChildToolbar'
import { executeKeyCode } from '../cpu/reducer'
import { setMainPanel } from '../ducks/ui'
import C from '../constants'
import K from '../cpu/keyCodes'
import './ConversionsPanel.css'

const conversions = {
  [K.TO_CM]: 'inches → cm',
  [K.TO_IN]: 'cm → inches',
  [K.TO_DEGREE_C]: '°F → °C',
  [K.TO_DEGREE_F]: '°C → °F',
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