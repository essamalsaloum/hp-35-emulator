import React from 'react'
import PropTypes from 'prop-types'
import InspectToolbar from './InspectToolbar'

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
const InspectTab = props => {

  const { keyCodes, index } = props

  const renderKeyCode = (keyCode, id) => (
    <div key={id} style={id === index ? styles.currentLine : styles.line}>
      {keyCode}
    </div>
  )

  return (
    <div style={styles.container}>
      <div style={styles.list}>
        {keyCodes.map(renderKeyCode)}
      </div>
      <InspectToolbar {...props} />
    </div>
  )
}

InspectTab.propTypes = {
  keyCodes: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired
}

export default InspectTab
