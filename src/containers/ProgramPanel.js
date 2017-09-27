import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'material-ui/Tabs'
import TabTemplate from '../components/TabTemplate'
import ProgramTab from './ProgramTab'
import GitHubTab from './GitHubTab'
import InspectTab from './InspectTab'
import { programPanelSelector } from '../modules/programPanel'
import './ProgramPanel.css'

// see: https://github.com/callemall/material-ui/issues/2085

const styles = {
  root: {
    flex: '1 1 100%',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    flex: '1 1 100%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  }
}

class ProgramPanel extends React.PureComponent {

  static propTypes = {
    selectedPanel: PropTypes.string
  }

  renderProgramTab() {
    return this.props.selectedPanel === 'program'
      ? (<ProgramTab />)
      : (<GitHubTab />)
  }

  render() {
    return (
      <div className="ProgramPanel">
        <Tabs
          style={styles.root}
          contentContainerStyle={styles.container}
          tabTemplate={TabTemplate}
        >
          <Tab label="Program">
            {this.renderProgramTab()}
          </Tab>
          <Tab label="Inspect">
            <InspectTab />
          </Tab>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedPanel: programPanelSelector(state)
})

export default connect(mapStateToProps)(ProgramPanel)