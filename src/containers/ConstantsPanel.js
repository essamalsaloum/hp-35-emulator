import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List, ListItem } from 'material-ui/List'
import physicsConstants from '../processor/physicsConstants'
import { emitKeyCode } from '../actions/processor'
import './ConstantsPanel.css'

// TODO: add filter text field

const createMarkup = ({ symb, value, unit }) => ({ __html: `${symb} = ${value} ${unit}` })

class ConstantsPanel extends React.PureComponent {

  static propTypes = {
    emitKeyCode: PropTypes.func.isRequired
  }

  renderList() {
    return physicsConstants.map(({ text, ...rest }, index) => (
      <ListItem
        key={index}
        primaryText={text}
        secondaryText={(<div style={{ height: '1.5em' }} dangerouslySetInnerHTML={createMarkup(rest)}></div>)}
        onClick={() => this.props.emitKeyCode(rest.value)}
      />
    ))
  }

  render() {
    return (
      <div className="ConstantsPanel">
        <List className="ConstantsPanel--list">
          {this.renderList()}
        </List>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    emitKeyCode,
  }, dispatch)

export default connect(null, mapDispatchToProps)(ConstantsPanel)