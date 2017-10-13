import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'
import LabelOutLine from 'material-ui/svg-icons/action/label-outline'
import ChildToolbar from '../components/ChildToolbar'
import WikiButton from '../components/WikiButton'
import { physicsConstantDefs } from '../cpu/instructions/physicsConstants'
import { setRecentConstant, recentConstantsSelector } from '../ducks/preferences'
import { setMainPanel, keyPressed } from '../ducks/ui'
import C from '../constants'
import './ConstantsPanel.css'

// TODO: add filter text field

const createMarkup = ({ symb, value, unit }) => ({ __html: `${symb} = ${value} ${unit}` })

class ConstantsPanel extends React.PureComponent {

  static propTypes = {
    keyPressed: PropTypes.func.isRequired,
    setMainPanel: PropTypes.func.isRequired,
    setRecentConstant: PropTypes.func.isRequired,
    recentConstants: PropTypes.array.isRequired,
  }

  onItemClick(keyCode) {
    this.props.setRecentConstant(keyCode)
    this.props.keyPressed(keyCode)
    this.props.setMainPanel(C.KEYPAD_PANEL)
  }

  onWikiClick(keyCode) {
    const { wiki } = physicsConstantDefs[keyCode]
    window.open(wiki, '_blank')
  }

  renderRecent() {
    const { recentConstants } = this.props
    if (recentConstants.length === 0) {
      return null
    }
    const constants = recentConstants.reduce((prev, keyCode) => {
      prev[keyCode] = physicsConstantDefs[keyCode]
      return prev
    }, {})
    return (
      <div>
        <Subheader>Recent</Subheader>
        {this.renderList(constants)}
      </div>
    )
  }

  renderList(constants) {
    return Object.keys(constants).map(keyCode => {
      const { text, wiki, ...rest } = constants[keyCode]
      return (
        <ListItem
          key={keyCode}
          leftAvatar={<Avatar icon={<LabelOutLine />} />}
          primaryText={text}
          secondaryText={(<div style={{ height: '1.5em' }} dangerouslySetInnerHTML={createMarkup(rest)}></div>)}
          onClick={() => this.onItemClick(keyCode)}
          rightIconButton={wiki ? <WikiButton onClick={() => this.onWikiClick(keyCode)} /> : null}
        />
      )
    })
  }

  render() {
    const {setMainPanel, recentConstants} = this.props
    return (
      <div className="ConstantsPanel">
        <ChildToolbar title="Physics Constants" onBackClick={() => setMainPanel(C.KEYPAD_PANEL)} />
        <List className="ConstantsPanel--list">
          {this.renderRecent()}
          {recentConstants.length > 0 ? <Subheader>All Constants</Subheader> : null}
          {this.renderList(physicsConstantDefs)}
        </List>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    keyPressed,
    setMainPanel,
    setRecentConstant,
  }, dispatch)

const mapStateToProps = state => ({
  recentConstants: recentConstantsSelector(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(ConstantsPanel)