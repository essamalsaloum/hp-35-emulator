import React from 'react'
import PropTypes from 'prop-types'
// import RaisedButton from 'material-ui/RaisedButton'

const style = {
  display: 'block',
  boxSizing: 'border-box',
  margin: 12,
  fontSize: 12,
  // fontFamily: ['Zapf Dingbats', 'sans-serif']
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