import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List, ListItem } from 'material-ui/List'
import physicsConstants from '../processor/physicsConstants'
import { injectKeyCode } from '../ducks/processor'
import './ConstantsPanel.css'

// TODO: add filter text field

const createMarkup = ({ symb, value, unit }) => ({ __html: `${symb} = ${value} ${unit}` })

class ConstantsPanel extends React.PureComponent {

  static propTypes = {
    injectKeyCode: PropTypes.func.isRequired
  }

  renderList() {
    return physicsConstants.map(({ text, ...rest }, index) => (
      <ListItem
        key={index}
        primaryText={text}
        secondaryText={(<div style={{ height: '1.5em' }} dangerouslySetInnerHTML={createMarkup(rest)}></div>)}
        onClick={() => this.props.injectKeyCode(rest.value)}
      />
    ))
  }

  render() {
    return (
      <List className="ConstantsPanel">
        {this.renderList()}
      </List>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    injectKeyCode,
  }, dispatch)

export default connect(null, mapDispatchToProps)(ConstantsPanel)