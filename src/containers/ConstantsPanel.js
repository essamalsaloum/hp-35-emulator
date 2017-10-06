import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import LabelOutLine from 'material-ui/svg-icons/action/label-outline'
import ChildToolbar from '../components/ChildToolbar'
import { physicsConstantDefs } from '../cpu/instructions/physicsConstants'
import { executeKeyCode } from '../cpu/reducer'
import { setMainPanel } from '../ducks/ui'
import C from '../constants'
import './ConstantsPanel.css'

// TODO: add filter text field

const createMarkup = ({ symb, value, unit }) => ({ __html: `${symb} = ${value} ${unit}` })

class ConstantsPanel extends React.PureComponent {

  static propTypes = {
    executeKeyCode: PropTypes.func.isRequired,
    setMainPanel: PropTypes.func.isRequired,
  }

  onItemClick(keyCode) {
    this.props.executeKeyCode(keyCode)
    this.props.setMainPanel(C.KEYPAD_PANEL)
  }

  renderList() {
    return Object.keys(physicsConstantDefs).map(keyCode => {
      const { text, ...rest } = physicsConstantDefs[keyCode]
      return (
        <ListItem
          key={keyCode}
          leftAvatar={<Avatar icon={<LabelOutLine />} />}
          primaryText={text}
          secondaryText={(<div style={{ height: '1.5em' }} dangerouslySetInnerHTML={createMarkup(rest)}></div>)}
          onClick={() => this.onItemClick(keyCode)}
        />
      )
    })
  }

  render() {
    return (
      <div className="ConstantsPanel">
        <ChildToolbar title="Physics Constants" onBackClick={() => this.props.setMainPanel(C.KEYPAD_PANEL)} />
        <List className="ConstantsPanel--list">
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

export default connect(null, mapDispatchToProps)(ConstantsPanel)