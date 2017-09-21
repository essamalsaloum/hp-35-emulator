import React from 'react'
import InspectToolbar from './InspectToolbar'
import store from '../store'

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  list: {
    padding: '8px 0',
    borderStyle: 'none',
    backgroundColor: '#fafafa',
    resize: 'none',
    fontFamily: `'Roboto', sans-serif`,
    fontSize: 14,
    flex: 1
  },
  line: {
    padding: '0 8px'
  },
  currentLine: {
    padding: '0 8px',
    backgroundColor: 'lightgray'
  }
}

export default class InspectTab extends React.PureComponent {

  state = {}

  constructor(props) {
    super(props)
    this.renderKeyCode = this.renderKeyCode.bind(this)
  }

  componentWillMount() {
    this.subscription = store.subscribe(state => {
      const { keyCodes, nextIndex } = state.program
      this.setState({ keyCodes, nextIndex })
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  renderKeyCode(keyCode, id) {
    return (
      <div key={id} style={id === this.state.nextIndex ? styles.currentLine : styles.line}>
        {keyCode}
      </div>
    )
  }

  render() {
    return (
      <div style={styles.container} >
        <div style={styles.list}>
          {this.state.keyCodes.map(this.renderKeyCode)}
        </div>
        <InspectToolbar />
      </div>
    )
  }
}

