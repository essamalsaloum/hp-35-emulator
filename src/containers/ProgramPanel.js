import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import TabTemplate from '../components/TabTemplate'
import ProgramTab from './ProgramTab'
import InspectTab from './InspectTab'
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

export default class ProgramPanel extends React.PureComponent {

  render() {
    return (
      <div className="ProgramPanel">
        <Tabs
          style={styles.root}
          contentContainerStyle={styles.container}
          tabTemplate={TabTemplate}
        >
          <Tab label="Program">
            <ProgramTab />
          </Tab>
          <Tab label="Inspect">
            <InspectTab />
          </Tab>
        </Tabs>
      </div>
    )
  }
}