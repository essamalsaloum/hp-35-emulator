import React from 'react'
import PropTypes from 'prop-types'

export default function Key(props) {
  const { className, label, keyPress } = props
  return (
    <button
      className={className}
      type="button"
      onClick={keyPress}>
      {label}
    </button>
  )
}

Key.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  keyPress: PropTypes.func
}

const noop = () => undefined

Key.defaultProps = {
  keyPress: noop
}