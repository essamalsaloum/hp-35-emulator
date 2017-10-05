import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { showProgramPanel } from '../ducks/ui'
import { fetchFileList, fetchProgramText, programsSelector } from '../ducks/programs'
import { loadMarkdownText } from '../ducks/program'
import { List, ListItem } from 'material-ui/List'
import AvPlayListPlay from 'material-ui/svg-icons/av/playlist-play'
import ChildToolbar from '../components/ChildToolbar'
import './GitHubTab.css'

class GitHubTab extends React.PureComponent {

  static propTypes = {
    programs: PropTypes.object,
    fetchFileList: PropTypes.func,
    fetchProgramText: PropTypes.func,
    showProgramPanel: PropTypes.func,
    loadMarkdownText: PropTypes.func
  }

  componentWillMount() {
    const { programs } = this.props
    if (!programs) {
      this.props.fetchFileList()
    }
  }

  onClick(name) {
    const { programs } = this.props
    const { text } = programs[name]
    if (text) {
      this.props.loadMarkdownText(text)
      this.props.showProgramPanel()
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
        <ChildToolbar onBackClick={this.props.showProgramPanel} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  programs: programsSelector(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchFileList,
    fetchProgramText,
    showProgramPanel,
    loadMarkdownText
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GitHubTab)