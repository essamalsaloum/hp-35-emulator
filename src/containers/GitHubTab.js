import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectProgramTab } from '../actions/programPanel'
import { fetchProgramList, fetchProgramText } from '../actions/programs'
import { setGitHubProgramText } from '../actions/currentProgram'
import { getPrograms } from '../reducers/programs'
import { List, ListItem } from 'material-ui/List'
import AvPlayListPlay from 'material-ui/svg-icons/av/playlist-play'
import GitHubToolbar from './GitHubToolbar'
import './GitHubTab.css'

class GitHubTab extends React.PureComponent {

  static propTypes = {
    programs: PropTypes.object,
    fetchProgramList: PropTypes.func,
    fetchProgramText: PropTypes.func,
    selectProgramTab: PropTypes.func,
    setGitHubProgramText: PropTypes.func
  }

  componentWillMount() {
    const { programs } = this.props
    if (!programs) {
      this.props.fetchProgramList()
    }
  }

  onClick(name) {
    const { programs } = this.props
    const { text } = programs[name]
    if (text) {
      this.props.setGitHubProgramText(text)
      this.props.selectProgramTab()
    } else {
      this.props.fetchProgramText(name)
    }
  }

  renderList() {
    const { programs } = this.props
    if (!programs) {
      return null
    }
    return Object.keys(programs).map(name => (
      <ListItem
        key={name}
        primaryText={name}
        leftIcon={<AvPlayListPlay />}
        onClick={() => this.onClick(name)}
      />
    ))
  }

  render() {
    return (
      <div className="GitHubTab">
        <List className="GitHubTab--list">
          {this.renderList()}
        </List>
        <GitHubToolbar onBackClick={this.props.selectProgramTab} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  programs: getPrograms(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchProgramList,
    fetchProgramText,
    selectProgramTab,
    setGitHubProgramText
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GitHubTab)