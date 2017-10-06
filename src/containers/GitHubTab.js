import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List, ListItem } from 'material-ui/List'
import AvPlayListPlay from 'material-ui/svg-icons/av/playlist-play'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { showProgramPanel } from '../ducks/ui'
import { fetchFileList, fetchProgramText, programsSelector, loadingSelector, errorSelector } from '../ducks/library'
import { loadMarkdownText } from '../ducks/program'
import ChildToolbar from '../components/ChildToolbar'
import './GitHubTab.css'

const REFRESHER_SIZE = 35

class GitHubTab extends React.PureComponent {

  static propTypes = {
    programs: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.objectOf(Error),
    fetchFileList: PropTypes.func,
    fetchProgramText: PropTypes.func,
    showProgramPanel: PropTypes.func,
    loadMarkdownText: PropTypes.func
  }

  refresherTop = 0
  refresherLeft = 0

  componentWillMount() {
    const { programs } = this.props
    if (!programs) {
      this.props.fetchFileList()
    }
  }

  componentDidMount() {
    this.refresherTop = (this.container.clientHeight - REFRESHER_SIZE) / 2
    this.refresherLeft = (this.container.clientWidth - REFRESHER_SIZE) / 2
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
    const { programs, error } = this.props
    if (error) {
      return (<ListItem
        primaryText={error.message}
      />)
    }
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
    const { loading } = this.props
    return (
      <div
        className="GitHubTab"
        ref={container => { this.container = container }}
      >
        <RefreshIndicator
          size={REFRESHER_SIZE}
          left={this.refresherLeft}
          top={this.refresherTop}
          status={loading ? 'loading' : 'hide'}
          className="GitHubTab--refresh"
        />
        <List className="GitHubTab--list">
          {this.renderList()}
        </List>
        <ChildToolbar onBackClick={this.props.showProgramPanel} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  programs: programsSelector(state),
  loading: loadingSelector(state),
  error: errorSelector(state),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchFileList,
    fetchProgramText,
    showProgramPanel,
    loadMarkdownText
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GitHubTab)