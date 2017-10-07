import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'
import SwapHoriz from 'material-ui/svg-icons/action/swap-horiz'
import ChildToolbar from '../components/ChildToolbar'
import WikiButton from '../components/WikiButton'
import { executeKeyCode } from '../cpu/reducer'
import { setMainPanel } from '../ducks/ui'
import C from '../constants'
import K from '../cpu/keyCodes'
import './ConversionsPanel.css'

const distance = {
  [K.IN_TO_CM]: { description: 'in → cm', comment: '1 in = 1/16 ft = 2.54 cm', wiki: 'https://en.wikipedia.org/wiki/Inch' },
  [K.CM_TO_IN]: { description: 'cm → in', comment: '1 cm = 0.394 in' },
  [K.FT_TO_M]: { description: 'ft → m', comment: '1 ft = 12 in = 0.305 m', wiki: 'https://en.wikipedia.org/wiki/Foot_(unit)' },
  [K.M_TO_FT]: { description: 'm → ft', comment: '1 m = 3.28 ft' },
  [K.YD_TO_M]: { description: 'yd → m', comment: '1 yd = 3 ft = 0.914 m', wiki: 'https://en.wikipedia.org/wiki/Yard' },
  [K.M_TO_YD]: { description: 'm → yd', comment: '1 m = 1.09 yd' },
  [K.MILE_TO_KM]: { description: 'mile → km', comment: '1 mile = 1760 yd = 5280 ft = 1.61 km', wiki: 'https://en.wikipedia.org/wiki/Mile' },
  [K.KM_TO_MILE]: { description: 'km → mile', comment: '1 km = 0.621 mile' },
}

const weight = {
  [K.LB_TO_KG]: { description: 'lb → kg', comment: '1 lb = 16 oz = 0.454 kg', wiki: 'https://en.wikipedia.org/wiki/Pound_(mass)' },
  [K.KG_TO_LB]: { description: 'kg → lb', comment: '1 kg = 2.20 lb' },
  [K.OZ_TO_G]: { description: 'oz → g', comment: '1 oz = 1/16 lb = 31.1 g', wiki: 'https://en.wikipedia.org/wiki/Ounce' },
  [K.G_TO_OZ]: { description: 'g → oz', comment: '1 g = 0.032 oz' },
}

const volume = {
  [K.GAL_TO_L]: { description: 'gal → l', comment: '1 gal = 3.79 l', wiki: 'https://en.wikipedia.org/wiki/Gallon' },
  [K.L_TO_GAL]: { description: 'l → gal', comment: '1 l = 0.264 gal'},
}

const math = {
  [K.DEG_TO_RAD]: { description: 'degrees → radians', comment: '180 degrees = π radians' },
  [K.RAD_TO_DEG]: { description: 'radians → degrees', comment: 'π radians = 180 degrees' },
}
const temperature = {
  [K.C_TO_F]: { description: '°C → °F', comment: '0 °C = 32 °F' },
  [K.F_TO_C]: { description: '°F → °C', comment: '100 °F → 37.8 °C'},
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

  onWikiClick(keyCode, conversions) {
    const { wiki } = conversions[keyCode]
    window.open(wiki, '_blank')
  }

  renderList(conversions) {
    return Object.keys(conversions).map(keyCode => {
      const { description, comment, wiki } = conversions[keyCode]
      return (
        <ListItem
          key={keyCode}
          leftAvatar={<Avatar icon={<SwapHoriz />} />}
          primaryText={<div dangerouslySetInnerHTML={{ __html: description }} />}
          secondaryText={comment ? <div style={{ height: '1.5em' }} dangerouslySetInnerHTML={{ __html: comment }} /> : null}
          onClick={() => this.onItemClick(keyCode)}
          rightIconButton={wiki ? <WikiButton onClick={() => this.onWikiClick(keyCode, conversions)} /> : null}
        />
      )
    })
  }

  render() {
    return (
      <div className="ConversionsPanel">
        <ChildToolbar title="Conversions" onBackClick={() => this.props.setMainPanel(C.KEYPAD_PANEL)} />
        <List className="ConversionsPanel--list">
          <Subheader>Distance</Subheader>
          {this.renderList(distance)}
          <Subheader>Weight</Subheader>
          {this.renderList(weight)}
          <Subheader>Volume</Subheader>
          {this.renderList(volume)}
          <Subheader>Math</Subheader>
          {this.renderList(math)}
          <Subheader>Temperature</Subheader>
          {this.renderList(temperature)}
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