import React from 'react'
import { List, ListItem } from 'material-ui/List'
import store from '../store'
import processor from '../processor'
import physicsConstants from '../processor/physicsConstants'
import './ConstantsPanel.css'

const createMarkup = ({ symb, value, unit }) => ({ __html: `${symb} = ${value} ${unit}` })

export default class ConstantPanel extends React.PureComponent {

  onClick(value) {
    const newState = processor.execute(store.getState().processor, parseFloat(value))
    store.setState({
      processor: { ...newState }
    })

  }

  renderList() {
    return physicsConstants.map(({ text, ...rest }, index) => (
      <ListItem
        key={index}
        primaryText={text}
        secondaryText={(<div style={{ height: '1.5em' }} dangerouslySetInnerHTML={createMarkup(rest)}></div>)}
        onClick={() => this.onClick(rest.value)}
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