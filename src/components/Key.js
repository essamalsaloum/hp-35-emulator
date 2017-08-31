import React from 'react'
import PropTypes from 'prop-types'

const style = {
  display: 'block',
  boxSizing: 'border-box',
  height: 32,
  fontSize: 12
}

export default function Key(props) {
  const { className, label, width = 40, onClick } = props
  return (
    <button
      type="button"
      className={className}
      style={{ ...style, width }}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

Key.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  width: PropTypes.number,
  onClick: PropTypes.func
}

const noop = () => undefined

Key.defaultProps = {
  onClick: noop
}