import React from 'react'
import PropTypes from 'prop-types'
// import RaisedButton from 'material-ui/RaisedButton'

const style = {
  display: 'block',
  boxSizing: 'border-box',
  fontSize: 12
}

export default function Key(props) {
  const { className, label, width = 40, keyPress } = props
  return (
    <button
      type="button"
      className={className}
      style={{ ...style, width }}
      onClick={keyPress}
    >
      {label}
    </button>
  )
}

Key.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  width: PropTypes.number,
  keyPress: PropTypes.func
}

const noop = () => undefined

Key.defaultProps = {
  keyPress: noop
}