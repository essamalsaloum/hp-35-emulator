import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List, ListItem } from 'material-ui/List'
import ChildToolbar from '../components/ChildToolbar'
import physicsConstants from '../cpu/physicsConstants'
import { executeKeyCode } from '../cpu/reducer'
import { setMainPanel } from '../ducks/ui'
import './ConstantsPanel.css'

// TODO: add filter text field

const createMarkup = ({ symb, value, unit }) => ({ __html: `${symb} = ${value} ${unit}` })

class ConstantsPanel extends React.PureComponent {

  static propTypes = {
    executeKeyCode: PropTypes.func.isRequired,
    setMainPanel: PropTypes.func.isRequired,
  }

  onItemClick(value) {
    this.props.executeKeyCode(value)
    this.props.setMainPanel('keypad')
  }

  renderList() {
    return physicsConstants.map(({ text, ...rest }, index) => (
      <ListItem
        key={index}
        primaryText={text}
        secondaryText={(<div style={{ height: '1.5em' }} dangerouslySetInnerHTML={createMarkup(rest)}></div>)}
        onClick={() => this.onItemClick(rest.value)}
      />
    ))
  }

  render() {
    return (
      <div className="ConstantsPanel">
        <ChildToolbar title="Physics Constants" onBackClick={() => this.props.setMainPanel('keypad')} />
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