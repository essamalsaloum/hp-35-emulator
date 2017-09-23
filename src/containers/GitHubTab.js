import React from 'react'
import store from '../store'
import { List, ListItem } from 'material-ui/List'
import AvPlayListPlay from 'material-ui/svg-icons/av/playlist-play'
import GitHubToolbar from './GitHubToolbar'
import { loadProgramList, loadProgram } from '../cloud/gitHub'
import './GitHubTab.css'

const updateGitHubState = store.setSubState('gitHub')
const updateProgramState = store.setSubState('program')
const updateProgramTabState = store.setSubState('programTab')

export default class GitHubTab extends React.PureComponent {

  state = {
    programs: []
  }

  componentWillMount() {
    this.subscription = store.subscribe(({ gitHub }) => {
      const { programs } = gitHub
      this.setState({ programs })
    })

    const { gitHub } = store.getState()
    if (gitHub.programs.length === 0) {
      loadProgramList()
        .then(programs => updateGitHubState({ programs }))
    }
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  onClick(title) {
    const { programs } = this.state
    const { text, url } = programs[title]
    if (text) {
      updateProgramState({ text })
      updateProgramTabState({ mode: 'program' })
    } else {
      loadProgram(url)
        .then(text => {
          programs[title].text = text
          updateGitHubState({ programs })
          updateProgramState({ text })
          updateProgramTabState({ mode: 'program' })
        })
    }
  }

  renderList() {
    const { programs } = this.state
    return Object.keys(programs).map(title => (
      <ListItem
        key={title}
        primaryText={title}
        leftIcon={<AvPlayListPlay />}
        onClick={() => this.onClick(title)}
      />
    ))
  }

  render() {
    return (
      <div className="GitHubTab">
        <List className="GitHubTab--list">
          {this.renderList()}
        </List>
        <GitHubToolbar />
      </div>
    )
  }
}